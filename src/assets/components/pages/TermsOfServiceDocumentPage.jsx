import MainNavigationBar from "../layout/MainNavigationBar";
import SiteFooter from "../layout/SiteFooter";

/*نا بنعرف المكوّن الرئيسي للصفحة باسم TermsOfServiceDocumentPage.
بياخد props من بينها setSelectedCategory عشان نقدر نغير التصنيف في الـ Footer.*/
export default function TermsOfServiceDocumentPage({
  currentUser,
  getTotalItems,
  setSelectedCategory, // دالة لتغيير التصنيف المختار من الفوتر.
}) {
  return (
    /*بداية الـ JSX (واجهة العرض).
    div رئيسي بكلاس page-container للتحكم في شكل وتصميم الصفحة.*/
    <div className="page-container">
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      {/*عنصر يحتوي على محتوى نص سياسة الاستخدام.
      الكلاس policy-content لضبط التصميم (مثل المسافات، عرض المحتوى، الألوان*/}
      <div className="policy-content">
        <h1>Terms of Service</h1>
        <p>
          Last updated: by <strong>abdallah ahmed</strong> August 15, 2025
        </p>
        <section>
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using ShopVibe, you agree to be bound by these Terms
            of Service and all terms incorporated by reference.
          </p>
        </section>
        <section>
          <h2>2. Use of the Service</h2>
          <p>
            You may use ShopVibe only for lawful purposes and in accordance with
            these Terms. You agree not to:
          </p>
          <ul>
            <li>Use the service in any way that violates any applicable law</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>
              Attempt to gain unauthorized access to any part of the service
            </li>
            <li>
              Use the service for commercial purposes without our permission
            </li>
          </ul>
        </section>
        <section>
          <h2>3. Account Registration</h2>
          <p>
            To access certain features, you may need to create an account. You
            agree to provide accurate information and keep it updated.
          </p>
        </section>
        <section>
          <h2>4. Purchases and Payment</h2>
          <p>When you make a purchase, you agree to:</p>
          <ul>
            <li>
              Provide current, complete, and accurate purchase information
            </li>
            <li>Pay all charges at the prices displayed</li>
            <li>
              Authorize us to charge your payment provider for the service
            </li>
          </ul>
        </section>
        <section>
          <h2>5. Intellectual Property</h2>
          <p>
            The service and its original content, features, and functionality
            are owned by ShopVibe and are protected by international copyright
            laws.
          </p>
        </section>
        <section>
          <h2>6. Termination</h2>
          <p>
            We may terminate or suspend your account immediately, without prior
            notice, for any reason including if you breach these Terms.
          </p>
        </section>
        <section>
          <h2>7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, ShopVibe shall not be liable
            for any indirect, incidental, special, consequential damages.
          </p>
        </section>
        <section>
          <h2>8. Governing Law</h2>
          <p>
            These Terms shall be governed by the laws of the State of California
            without regard to its conflict of law provisions.
          </p>
        </section>
        <section>
          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will
            notify users of material changes via email or through the website.
          </p>
        </section>
        <section>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            legal@shopvibe.com.
          </p>
        </section>
      </div>
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
