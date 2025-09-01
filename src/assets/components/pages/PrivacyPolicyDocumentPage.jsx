import MainNavigationBar from "../layout/MainNavigationBar";
import SiteFooter from "../layout/SiteFooter";
import "../../styles/PrivacyPolicyDocumentPage.css";
export default function PrivacyPolicyDocumentPage({
  currentUser,
  getTotalItems,
  setSelectedCategory, // دالة لتغيير التصنيف المختار من الفوتر.
}) {
  return (
    <div className="page-container">
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />

      <div className="policy-content">
        <h1>Privacy Policy</h1>
        <p>Last updated: August 6, 2025 by abdallah ahmed</p>
        <section>
          <h2>1. Introduction</h2>
          <p>
            Welcome to ShopVibe! This Privacy Policy explains how we collect,
            use, and disclose information about you when you use our website and
            services.
          </p>
        </section>
        <section>
          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, make a purchase, or contact customer support.
            This may include:
          </p>
          <ul>
            <li>
              Personal information (name, email address, shipping address)
            </li>
            <li>Payment information</li>
            <li>Product reviews and ratings</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>
        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Provide customer support</li>
            <li>Send you marketing communications (with your consent)</li>
            <li>Improve our products and services</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>
        <section>
          <h2>4. Information Sharing</h2>
          <p>
            We do not sell your personal information. We may share your
            information with:
          </p>
          <ul>
            <li>Service providers who help us operate our business</li>
            <li>Payment processors to complete transactions</li>
            <li>Shipping carriers to deliver your orders</li>
            <li>Legal authorities when required by law</li>
          </ul>
        </section>
        <section>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information from unauthorized access, alteration, disclosure, or
            destruction.
          </p>
        </section>
        <section>
          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your personal data</li>
          </ul>
        </section>
        <section>
          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </p>
        </section>
        <section>
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at privacy@shopvibe.com.
          </p>
        </section>
      </div>
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
