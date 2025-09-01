import MainNavigationBar from "../layout/MainNavigationBar"; //مكوّن (Component) لشريط التنقل العلوي (Navbar).
import SiteFooter from "../layout/SiteFooter"; //مكوّن الفوتر الموجود أسفل الصفحة.
import ProductDisplayCard from "../ui/ProductDisplayCard"; //مكوّن لعرض بطاقة منتج (صورة + اسم + سعر + زر إضافة للعربة).
import DataLoadingIndicator from "../ui/DataLoadingIndicator"; //مكوّن يظهر مؤشر التحميل (Loading) عند انتظار البيانات.
import "../../styles/SpecialOffersPage.css"; //ملف التنسيقات (CSS) الخاص بصفحة العروض الخاصة.

/*
SpecialOffersPage → مكوّن React يمثل صفحة "العروض الخاصة".
Props:*/
export default function SpecialOffersPage({
  currentUser, //بيانات المستخدم الحالي (لتخصيص العرض أو تسجيل الدخول).
  getTotalItems, //دالة تعطي عدد المنتجات الموجودة حاليًا في السلة.
  getOfferedProducts, //دالة تجلب المنتجات التي عليها خصم.
  addToCart, //دالة لإضافة منتج للسلة.
  addedItems, //قائمة المنتجات التي تمت إضافتها بالفعل للسلة.
  loading, //قيمة منطقية (true/false) لمعرفة إذا كان التحميل شغال.
  setSelectedCategory, //دالة لتغيير التصنيف المختار من الفوتر.
}) {
  /*هنا لو getOfferedProducts موجودة → نستدعيها للحصول على المنتجات المخفضة.
لو مش موجودة → نعطي مصفوفة فاضية بدلها عشان نتجنب الأخطاء.*/
  const offeredProducts = getOfferedProducts ? getOfferedProducts() : [];

  //واجهة العرض (JSX)
  return (
    //<div className="page-container"> → عنصر الحاوية الرئيسي للصفحة.
    <div className="page-container">
      {/*مكوّن شريط التنقل العلوي (Navbar) مع تمرير props المطلوبة.*/}
      {/*يضيف الـ Navbar مع تمرير بيانات المستخدم وعدد المنتجات في السلة.*/}
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      {/*محتوى العروض*/}
      <div className="offers-content">
        <h1>Special Offers</h1>
        <p className="offers-description">
          Discover amazing deals with discounts over 10%! Limited time offers on
          selected products.
        </p>
        {/*إذا loading = true → عرض مؤشر التحميل (Loading spinner).*/}
        {loading ? (
          <DataLoadingIndicator />
        ) : (
          <div className="products-grid">
            {/*لو في منتجات مخفضة، نعرضها في شبكة (Grid).*/}
            {/*لو مش في حالة تحميل → عرض المنتجات.
            .filter() → نتأكد أن المنتج موجود وله id.
            .slice(0, 8) → نعرض أول 8 منتجات فقط.
            .map() → نمر على كل منتج ونرسم له بطاقة باستخدام ProductDisplayCard.
            تمرير البيانات لكل بطاقة:
            المنتج نفسه
            دالة الإضافة للسلة
            قائمة المنتجات المضافة
            isOfferCard={true} → عشان البطاقة تعرف إنها عرض خاص وتعرض تصميم مختلف.*/}
            {offeredProducts
              .filter((product) => product && product.id)
              .slice(0, 8)
              .map((product) => (
                <ProductDisplayCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  addedItems={addedItems}
                  isOfferCard={true}
                />
              ))}
          </div>
        )}
        {/*لو مفيش منتجات (offeredProducts.length === 0) و مش في حالة تحميل → عرض رسالة "لا توجد عروض حاليًا".*/}
        {offeredProducts.length === 0 && !loading && (
          <div className="no-offers">
            <p>No special offers available at the moment. Check back later!</p>
          </div>
        )}
      </div>
      {/*إضافة الفوتر وتمرير دالة setSelectedCategory ليقدر المستخدم يغير التصنيف من الأسفل.*/}
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
