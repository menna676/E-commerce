import React, { useEffect, useState } from "react";

const Toast = ({ message, show, onClose, type = "success" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setAnimationClass("entering");

      // Auto-hide after 3 seconds
      const hideTimer = setTimeout(() => {
        setAnimationClass("exiting");

        // Remove from DOM after exit animation
        setTimeout(() => {
          setIsVisible(false);
          setAnimationClass("");
          onClose();
        }, 300);
      }, 3000);

      return () => clearTimeout(hideTimer);
    }
  }, [show, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-container">
      <div className={`toast ${type} ${animationClass} ${show ? "show" : ""}`}>
        {message}
      </div>
    </div>
  );
};

export default Toast;
