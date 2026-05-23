import React from 'react';
import './ThankYouPage.css';

export default function ThankYouPage() {
  return (
    <div className="ty-page">
      <div className="ty-orb ty-orb-1" />
      <div className="ty-orb ty-orb-2" />

      <div className="ty-card animate-fade-up">
        <div className="ty-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="url(#tg1)" />
            <path d="M12 20l5.5 5.5L28 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="tg1" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22c55e"/>
                <stop offset="1" stopColor="#16a34a"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <h1 className="ty-title">You're all set!</h1>
        <p className="ty-message">
          Thanks for reaching out. We've received your details and our team will
          get back to you within <strong>24–48 hours</strong>.
        </p>

        <div className="ty-divider" />

        <div className="ty-details">
          <div className="ty-detail-item">
            <span className="ty-detail-icon">📋</span>
            <span>Your response has been recorded</span>
          </div>
          <div className="ty-detail-item">
            <span className="ty-detail-icon">📧</span>
            <span>Check your inbox for a confirmation</span>
          </div>
          <div className="ty-detail-item">
            <span className="ty-detail-icon">💬</span>
            <span>Our team will reach out shortly</span>
          </div>
        </div>
      </div>
    </div>
  );
}
