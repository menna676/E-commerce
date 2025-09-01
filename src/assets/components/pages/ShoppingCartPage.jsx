import React, { useState } from "react";
/*بيستورد React عشان نكتب مكوّنات.
وبيستورد useState (Hook) عشان نعرّف متغيرات حالة (state) جوا المكوّن.*/
import { Link } from "react-router-dom";
//بيستورد Link للتنقّل بين الصفحات داخليًا من غير إعادة تحميل.
import MainNavigationBar from "../layout/MainNavigationBar";
//مكوّن شريط التنقل العلوي (النافبار).
import SiteFooter from "../layout/SiteFooter";
//مكوّن الفوتر تحت الصفحة
import Toast from "./Toast";
//مكوّن رسائل منبثقة صغيرة (توست) لعرض إشعارات مؤقتة.
import "../../styles/ShoppingCartPage.css";
/*بيعرّف المكوّن الرئيسي ShoppingCartPage.

بياخد props جاهزة من الأب:*/
export default function ShoppingCartPage({
  currentUser, //بيانات المستخدم (للنّافبار غالبًا).
  getTotalItems, //دالة ترجع إجمالي عدد القطع في السلة.
  cart, //مصفوفة عناصر السلة.
  updateQuantity, //دالة لتحديث كمية عنصر في السلة.
  removeFromCart, //دالة لحذف عنصر من السلة.
  setSelectedCategory, //دالة لتحديد الفئة المختارة (للفوتر غالبًا).
}) {
  //حالة (state) لتخزين رسالة التوست، وعرضها، ونوعها.
  //متغير حالة اسمه toastMessage لتخزين نص الرسالة اللي هتظهر في التوست. بيبدأ فاضي "".
  const [toastMessage, setToastMessage] = useState("");
  //showToast: هل نظهر التوست ولا لأ. البداية مخفي false.
  const [showToast, setShowToast] = useState(false);
  /*toastType: نوع التوست (مثلاً success / remove). البداية "success".
التعليق بيقول إن ده جديد لنوع الرسالة.*/
  const [toastType, setToastType] = useState("success"); // New state for toast type

  //دالة بتاخد message ونوع type، ولو ما بعتّش نوع بيبقى الافتراضي "success"
  const showToastMessage = (message, type = "success") => {
    //بتخزن نص الرسالة في الحالة.
    setToastMessage(message);
    //بتحدد نوع التوست (هيفيد المكوّن Toast يغير الشكل/اللون حسب النوع).
    setToastType(type);
    //بتخلي التوست يظهر.
    setShowToast(true);
  };

  //تحديث الكمية مع تحديد رسالة مناسبة
  //دالة بتتنده لما المستخدم يزود/يقلل كمية عنصر معين.
  const handleUpdateQuantity = (cartId, newQuantity) => {
    //بتنادي الدالة الجاية من الأب لتحديث الكمية في الـ state الأعلى
    updateQuantity(cartId, newQuantity);
    /*هنا بيقارن: هل newQuantity أكبر من الكمية القديمة؟
بيلاقي العنصر القديم من cart بالـ cartId.
?.quantity (Optional chaining) عشان لو العنصر مش موجود ما يكسرش الكود.
لو الجديدة أكبر من القديمة → يبقى المستخدم زوّد الكمية.*/
    if (newQuantity > cart.find((item) => item.cartId === cartId)?.quantity) {
      //لو زاد: اعرض توست برسالة نجاح.
      showToastMessage("✅ Quantity increased successfully!");
    } else {
      //غير كده: معناها نقص الكمية → اعرض رسالة “كمية قلت”.
      showToastMessage("📉 Quantity decreased");
    }
  };
  //ملاحظة: المقارنة دي بتفترض إن cart لسه فيه القيمة القديمة قبل ما ينعكس التحديث. لو updateQuantity بتعدل المرجع نفسه فورًا، ساعتها ممكن تحتاج تجيب القيمة القديمة قبل النداء.

  //دالة بتتنده لما المستخدم يحذف عنصر من السلة.
  //بتاخد cartId للعنصر اللي عايز يحذفه.

  const handleRemoveFromCart = (cartId) => {
    //بتنادي الدالة الجاية من الأب لحذف العنصر من الـ state الأعلى.
    removeFromCart(cartId);
    //تعرض توست برسالة حذف، ونوع "remove" (عشان الـ Toast يلوّنها/يعرضها بشكل مختلف).
    showToastMessage("🗑️ Item removed from cart", "remove");
  };

  //واجهة العرض (JSX)
  return (
    //هنرجّع عنصر جذر بصف CSS page-container لهيكلة الصفحة.
    //يعرض النافبار فوق، ويمرر له المستخدم وإجمالي العناصر.
    <div className="page-container">
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      {/*هنا بنعرض محتوى السلة. لو السلة فاضية، نعرض رسالة. لو فيها عناصر، نعرضها في قائمة.*/}
      {/*إذا كانت السلة فاضية، نعرض رسالة و رابط للمتابعة للتسوق.*/}
      <div className="cart-content">
        <h1>Shopping Cart</h1>
        {/*شرط بالـ ternary: لو السلة فاضية (طولها 0) اعرض واجهة “سلة فارغة”…*/}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            {/*زر للرجوع للتسوق باستخدام Link لصفحة /home (تنقّل داخلي)*/}
            <Link to="/home" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          //وإلا (السلة فيها عناصر) اعرض قائمة العناصر.
          <div className="cart-items">
            {/*نستخدم map لعرض كل عنصر في السلة.*/}
            {cart.map((item) => (
              <div key={item.cartId} className="cart-item">
                {/*بنلفّ على كل عنصر في السلة بـ .map.*/}
                {/*كل عنصر له cartId فريد، نستخدمه كمفتاح (key) لتفادي الأخطاء في React.*/}
                {/*صورة المنتج. alt لنص بديل/وصول.*/}
                <img src={item.thumbnail} alt={item.title} />
                {/*حاوية تفاصيل المنتج.*/}
                <div className="cart-item-details">
                  {/*اسم/عنوان المنتج.*/}
                  <h3>{item.title}</h3>
                  <p className="cart-item-category">
                    {/*سطر للتصنيف. {" "} بس مسافة في JSX*/}
                    Category:{" "}
                    {/*تنسيق شكل التصنيف:
                    يستبدل - بمسافة (مثلاً mens-shoes → mens shoes).
                    regex \b\w يلقط أول حرف في كل كلمة ويحوّله كابيتال → Mens Shoes.*/}
                    {item.category
                      .replace("-", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </p>
                  {/*سعر القطعة الواحدة للمنتج.*/}
                  <p className="cart-item-price">${item.price}</p>
                  <div className="quantity-controls">
                    {/*حاوية أزرار الكمية.*/}
                    {/* , و بيعرض دالة handle update quantity زر “–” لتقليل الكمية:
                    عند الضغط: ينادي handleUpdateQuantity بكمية أقل 1.
                    disabled يمنع النزول لأقل من 1.*/}
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.cartId, item.quantity - 1)
                      }
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    {/*يعرض الكمية الحالية.*/}
                    <span className="quantity-display">{item.quantity}</span>
                    {/*زر “+” لزيادة الكمية: ينادي نفس الدالة بكمية +1.*/}
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item.cartId, item.quantity + 1)
                      }
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  {/*الإجمالي الجزئي للعنصر = السعر × الكمية.
                  toFixed(2) عشان يظهر بمنزلتين عشريتين (تنسيق فلوس).*/}
                  <p className="item-total">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                {/*زر حذف العنصر من السلة: ينادي handleRemoveFromCart.*/}
                <button
                  onClick={() => handleRemoveFromCart(item.cartId)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
            {/* بعد عرض كل العناصر، نعرض ملخص السلة اللي هو اجمالي عناصر + اجمالي مبلغ:*/}
            <div className="cart-summary">
              <div className="cart-stats">
                {/*إجمالي عدد العناصر في السلة باستخدام الدالة getTotalItems.*/}
                {/*لإجمالي الكلي: باستخدام reduce بنجمع كل (السعر × الكمية) على بعض.
                  0 هو قيمة البداية للجمع.
                  toFixed(2) لتنسيق الرقم كعملة.*/}
                <p>Total Items: {getTotalItems()}</p>
                <h2>
                  Total Amount: $
                  {cart
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </h2>
              </div>
            </div>
          </div>
        )}
        {/*نهاية شرط السلة: لو فاضية أو فيها عناصر.*/}
      </div>
      <SiteFooter setSelectedCategory={setSelectedCategory} />
      {/*عرض الفوتر، وتمرير setSelectedCategory لو الفوتر فيه روابط تغيّر التصنيف.*/}

      {/*مكوّن التوست:
      message: نص الرسالة المعروضة.
      show: هل التوست ظاهر أم لا.
      type: نوع التوست (success/remove …) عشان يغيّر الستايل.
      onClose: لما يتقفل، نخلي showToast = false*/}
      <Toast
        message={toastMessage}
        show={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
