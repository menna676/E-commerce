import { useState } from "react";
import MainNavigationBar from "../layout/MainNavigationBar";
import SiteFooter from "../layout/SiteFooter";
import "../../styles/ContactUsPage.css";

export default function ContactUsPage({
  currentUser,
  getTotalItems,
  setSelectedCategory,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitting(true);
      setTimeout(() => {
        setShowThankYou(true);
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitting(false);
        setTimeout(() => setShowThankYou(false), 7000);
      }, 1000);
    }
  };

  return (
    <div className="page-container">
      <MainNavigationBar
        currentUser={currentUser}
        getTotalItems={getTotalItems}
      />
      <div className="contact-content">
        <h1>Contact Us</h1>
        {showThankYou && (
          <div className="thank-you-overlay">
            <div className="thank-you-modal">
              <div className="thank-you-icon">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              <h2>Thank You!</h2>
              <p>
                Thanks for contacting us! We'll reach out to you as soon as
                possible.
              </p>
              <div className="thank-you-details">
                <p>
                  We typically respond within 24 hours during business days.
                </p>
              </div>
              <button
                className="close-thank-you-btn"
                onClick={() => setShowThankYou(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="contact-info">
          <div className="contact-section">
            <h3>Get in Touch</h3>
            <p>
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </p>
            <div className="contact-details">
              <p>
                <strong>Email:</strong> info@shopvibe.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
              <p>
                <strong>Address:</strong> 123 Shopping Street, Commerce City, CC
                12345
              </p>
            </div>
          </div>
          <div className="contact-form">
            <h3>Send Message</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              ></textarea>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <SiteFooter setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
