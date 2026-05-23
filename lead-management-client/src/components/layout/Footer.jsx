import React from 'react';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="dash-footer">
      <span className="footer-copy">© {year} LeadManager — Admin Portal</span>
      <span className="footer-sep">·</span>
      <span className="footer-note">All data is stored securely</span>
    </footer>
  );
}
