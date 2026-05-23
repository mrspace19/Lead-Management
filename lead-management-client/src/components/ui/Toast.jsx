import React, { useState, useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, type = 'error', duration = 4000, onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    if (type === 'error') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M10 6v4M10 14v.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    } else if (type === 'success') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M7 10l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <div className="toast-icon">{getIcon()}</div>
        <span className="toast-message">{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={() => {
          setIsVisible(false);
          onClose && onClose();
        }}
        aria-label="Close toast"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
