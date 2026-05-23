import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

export default function Navbar({ onMenuToggle, sidebarOpen }) {
  const { admin, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="nav-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            {sidebarOpen ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            ) : (
              <>
                <path d="M3 5h12M3 9h12M3 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
        <div className="nav-brand">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <rect width="28" height="28" rx="9" fill="url(#nbg)" />
            <path d="M8 14l4 4 8-8" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="nbg" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6c63ff"/><stop offset="1" stopColor="#a78bfa"/>
              </linearGradient>
            </defs>
          </svg>
          <span className="nav-brand-name">LeadManager</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="nav-avatar-wrap">
          <div className="nav-avatar">
            {admin?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <div className="nav-user-info">
            <span className="nav-user-name">{admin?.name || 'Admin'}</span>
            <span className="nav-user-role">Administrator</span>
          </div>
        </div>
        <button className="nav-logout-btn" onClick={logout} title="Logout">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 14H3a1 1 0 01-1-1V3a1 1 0 011-1h3M11 11l3-3-3-3M14 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}
