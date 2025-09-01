import { Link } from "react-router-dom";
import "../../styles/SiteFooter.css";

export default function SiteFooter({ setSelectedCategory }) {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ShopVibe</h3>
          <p>
            Your one-stop shop for everything you need. Discover amazing
            products at great prices with fast delivery and excellent customer
            service.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/home" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/offers" className="footer-link">
                Offers
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/members" className="footer-link">
                Our Team
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Popular Categories</h4>
          <ul>
            <li>
              <button
                onClick={() => handleCategoryClick("home-decoration")}
                className="footer-link"
              >
                Home Decoration
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("furniture")}
                className="footer-link"
              >
                Furniture
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("groceries")}
                className="footer-link"
              >
                Groceries
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("laptops")}
                className="footer-link"
              >
                Laptops
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>
            <strong>Email:</strong> Shophub@gmail.com
          </p>
          <a
            href="https://github.com/AbdallahAhmed244/shopvibe--gdg.git"
            target="_blank"
          >
            GitHub project
          </a>
          <p>
            <strong>Address:</strong> cairo, Egypt, 123 Shopping Street, 12345
          </p>
          <p>
            <strong>Phone:</strong> +20 1146839406
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2025 ShopVibe. All rights reserved. |
          <Link to="/privacy-policy" className="footer-bottom-link">
            Privacy Policy
          </Link>
          |
          <Link to="/terms-of-service" className="footer-bottom-link">
            Terms of Service
          </Link>
        </p>
      </div>
    </footer>
  );
}
