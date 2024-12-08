import React, { useEffect } from "react";
import "./Alert.scss";

const Alert = ({ type, message, onClose }) => {
  // close after 5sec. if not closed by user
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`alert ${type}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">
        ×
      </button>
    </div>
  );
};

export default Alert;
