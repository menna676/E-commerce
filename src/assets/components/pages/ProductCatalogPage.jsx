import MainNavigationBar from "../layout/MainNavigationBar"; //مكوّن (Component) لشريط التنقل العلوي (Navbar).
import SiteFooter from "../layout/SiteFooter"; //مكوّن الفوتر الموجود أسفل الصفحة.
import ProductDisplayCard from "../ui/ProductDisplayCard"; //مكوّن لعرض بطاقة منتج (صورة + اسم + سعر + زر إضافة للعربة).
import DataLoadingIndicator from "../ui/DataLoadingIndicator"; //مكوّن يظهر مؤشر التحميل (Loading) عند انتظار البيانات.
import "../../styles/ProductCatalogPage.css"; //ملف التنسيقات (CSS) الخاص بصفحة العروض الخاصة.

//اول حاجة بنعمل import للملفات اللي محتاجينها زي الناف بار و الفوتر و ال card اللي هنعرض بيها المنتجات و ال loading indicator

//فانكشن لتصفية المنتجات على حسب البحث او ال تصنيف المختار
const getFilteredProducts = (products, searchTerm, selectedCategory) => {
  //fبنحط id لكل منتج و بعد كدا نشيل اللي ليهم نفس ال id  و بعد كدا بنخزنهم في ال map و عن الطريق ال value  بنرجعهم من غير  id و نرجعهم عللى هيئة array
  // عشان ال value بتدينا حاجة اسمها iterator  غير ال  array و بنعاملهم ك list عادي
  const uniqueProducts = Array.from(
    new Map(products.map((product) => [product.id, product])).values()
  );
  let filtered = uniqueProducts;
  if (selectedCategory !== "all") {
    //لو ال تصنيف المختار مش "الكل" بنعمل تصفية للمنتجات على حسب التصنيف
    // في حالة ال sports هي مش موجودة باسمها في ال API او الداتا بيز هي عبارة عن تصنيفات فرعية زي "mens-shirts" و "womens-dresses" و "mens-shoes" و "womens-shoes"
    // فبنعمل تصفية على حسب الكلمات المفتاحية اللي ممكن تكون موجودة في العنوان او الوصف
    if (selectedCategory === "electronics") {
      filtered = filtered.filter(
        (product) =>
          product.category && product.category.toLowerCase() === "electronics"
      );
    } else if (selectedCategory === "sport") {
      filtered = filtered.filter(
        (product) =>
          product.category === "mens-shirts" ||
          product.category === "mens-shoes" ||
          product.category === "womens-dresses" ||
          product.category === "womens-shoes" ||
          product.title.toLowerCase().includes("sport") ||
          product.title.toLowerCase().includes("gym") ||
          product.title.toLowerCase().includes("fitness")
      );
    } else {
      //هنا عادي بيعمل تصفية على حسب التصنيف المختار case insensitive
      filtered = filtered.filter(
        (product) =>
          product.category &&
          product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
  }
  //لو في مصطلح بحث بنعمل تصفية على حسب العنوان او الوصف او التصنيف كاتجوري او الماركة
  //If the search box is not empty,searchLower is the search term in lowercase with no extra spaces.
  if (searchTerm && searchTerm.trim() !== "") {
    const searchLower = searchTerm.toLowerCase().trim();
    filtered = filtered.filter((product) => {
      if (!product.title) return false;
      //Does the product title contain the search text?
      const titleMatch = product.title.toLowerCase().includes(searchLower);
      //Does the product description contain the search text?
      const descriptionMatch =
        product.description &&
        product.description.toLowerCase().includes(searchLower);

      //Category matches exactly
      //Category matches when replacing - with space
      //Or, if search term is longer than 2 letters, category contains it.
      let categoryMatch = false;
      if (product.category) {
        const categoryOriginal = product.category.toLowerCase();
        const categoryFormatted = product.category
          .replace(/-/g, " ")
          .toLowerCase();
        categoryMatch =
          categoryOriginal === searchLower ||
          categoryFormatted === searchLower ||
          (searchLower.length > 2 && categoryOriginal.includes(searchLower)) ||
          (searchLower.length > 2 && categoryFormatted.includes(searchLower));
      }
      /*لو فيه نص مكتوب في البحث:

  بنحوّل النص للـ lowercase عشان البحث مايفرقش بين الحروف الكبيرة والصغيرة.
 بندور في:
 عنوان المنتج (title).
 وصف المنتج (description).
 الكاتيجوري (category) بعد تعديلها (استبدال - بمسافة).
 الماركة (brand).
 لو أي واحدة من دول بتحتوي على نص البحث → المنتج يفضل.*/
      //Does the brand contain the search text?
      const brandMatch =
        product.brand && product.brand.toLowerCase().includes(searchLower);

      //Keep the product if any of those match.
      return titleMatch || descriptionMatch || categoryMatch || brandMatch;
    });
  }
  //Finally, return the filtered list: بنرجع المنتجات بعد التصفية
  return filtered;
};

//This is the main page component that displays everything.
export default function ProductCatalogPage({
  //ال props الدعائم اللي بتستقبلها الصفحة
  currentUser, //المستخدم الحالي
  getTotalItems, //اجمالي عدد العناصر في السلة
  products, //كل المنتجات
  availableCategories, //التصنيفات المتاحة
  searchTerm, //البحث الحالي
  setSearchTerm, //تحديث البحث
  selectedCategory, //التصنيف المختار
  setSelectedCategory, //تحديث التصنيف المختار
  addToCart, //اضافة منتج للسلة
  addedItems, //العناصر المضافة للسلة
  loading, //هل الصفحة لسة بتحمل و بتجيب البيانات
}) {
  //خطوات العرض
  // هنا بنبدأ نعرض الصفحة الرئيسية للمنتجات
  // بنجيب المنتجات المصفاة بناءً على البحث والتصنيف المختار
  // و بنعرضها في الصفحة
  const filteredProducts = getFilteredProducts(
    products,
    searchTerm,
    selectedCategory
  );
  //التأكد من وجود مصطلح بحث و تصفية المنتجات بناءً على ذلك
  const isSearching = searchTerm && searchTerm.trim() !== "";
  //تحديد التصنيف النشط بناءً على البحث أو التصنيف المختار
  // لو في بحث بنرجع null عشان ما نعرضش تصنيف نشط
  // لو مفيش بحث بنرجع التصنيف المختار الحالي
  const getActiveCategoryButton = () => {
    if (isSearching) {
      return null;
    }
    return selectedCategory;
  };
  //تغيير التصنيف المختار عند الضغط على زر تصنيف
  // لو في بحث بنمسح البحث الحالي
  // و بنحدث التصنيف المختار
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (isSearching) {
      setSearchTerm("");
    }
  };
  //تغيير مصطلح البحث عند الكتابة في خانة البحث
  // بنحدث مصطلح البحث بناءً على ما يكتبه المستخدم
  // و بنعمل تصفية للمنتجات بناءً على ذلك
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //الغاء البحث و التصنيفات المختارة
  // بنعيد تعيين مصطلح البحث و التصنيف المختار إلى القيم الافتراضية
  // و بنعرض كل المنتجات مرة أخرى
  const clearSearchAndFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  const activeCategoryButton = getActiveCategoryButton();

  return (
    // هنا بنبدأ نعرض الصفحة الرئيسية للمنتجات //الناف بار
    <div className="page-container">
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      <div className="home-content">
        <div className="hero-section">
          {/* قسم الترحيب */}
          <h1>Welcome to ShopVibe</h1>
          <p>Discover amazing products at great prices</p>
        </div>
        {/*قسم البحث + عدد النتائج + التصنيف النشط*/}
        <div className="search-section">
          <input
            type="text"
            placeholder="Search products, categories, brands..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          {isSearching && (
            <div className="search-info">
              <p>
                {filteredProducts.length} result
                {filteredProducts.length !== 1 ? "s" : ""} found for "
                {searchTerm}"
              </p>
              {filteredProducts.length > 0 && selectedCategory !== "all" && (
                <p>
                  in category:{" "}
                  {selectedCategory
                    .replace("-", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </p>
              )}
            </div>
          )}
        </div>
        {/*قسم التصنيفات + عرض المنتجات*/}
        <div className="categories-section">
          <h2>Categories</h2>
          <div className="categories">
            <button
              className={
                activeCategoryButton === "all"
                  ? "category-btn active"
                  : "category-btn"
              }
              onClick={() => handleCategorySelect("all")}
            >
              All Products ({products.length})
            </button>
            {availableCategories.map((categoryData) => (
              <button
                key={categoryData.category}
                className={
                  activeCategoryButton === categoryData.category
                    ? "category-btn active"
                    : "category-btn"
                }
                onClick={() => handleCategorySelect(categoryData.category)}
              >
                {categoryData.category
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
                ({categoryData.count})
              </button>
            ))}
          </div>
        </div>
        {/*قسم عرض المنتجات // هنا بنبدأ نعرض المنتجات المصفاة بناءً على البحث
        والتصنيف المختا*/}
        <div className="products-section">
          <h2>
            Products
            {selectedCategory !== "all" && !isSearching && (
              <span className="category-title">
                -{" "}
                {selectedCategory
                  .replace("-", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
            )}
            {isSearching && (
              <span className="search-title">
                - Search Results for "{searchTerm}"
              </span>
            )}
          </h2>
          {loading ? (
            <DataLoadingIndicator />
          ) : filteredProducts.length === 0 ? (
            // لو الصفحة لسة بتحمل بنعرض ال loading indicator // لو مفيش منتجات
            //  شكل grid لو في منتجات مصفاة بنعرضها في
            //مصفاة بنعرض رسالة بعدم وجود منتجات
            <div className="no-products">
              {isSearching ? (
                // لو في بحث و مفيش منتجات مصفاة بنعرض رسالة بعدم وجود منتجات
                <div>
                  <p>No products found matching "{searchTerm}"</p>
                  <button
                    onClick={clearSearchAndFilters}
                    className="clear-search-btn"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <p>No products found matching your criteria.</p>
              )}
            </div>
          ) : (
            //غير كدا بنعرض المنتجات المصفاة في شكل grid شبكة
            // كل منتج يتم عرضه باستخدام ال ProductDisplayCard
            // و بنمرر له المنتج و الدوال المطلوبة لإضافة المنتج للسلة و العناصر المضافة
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductDisplayCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  addedItems={addedItems}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
    //هنا بنعرض الفوتر
  );
}
