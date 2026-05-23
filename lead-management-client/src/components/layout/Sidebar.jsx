import React from 'react';
import './Sidebar.css';

const NAV_ITEMS = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    id: 'leads',
    label: 'All Leads',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 9a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M3 16c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Sidebar({ open, activeTab, onTabChange }) {
  return (
    <>
      {/* Overlay for mobile */}
      {open && <div className="sidebar-overlay" onClick={() => onTabChange(activeTab)} />}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Menu</div>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <span className="sidebar-item-icon">{item.icon}</span>
              <span className="sidebar-item-label">{item.label}</span>
              {activeTab === item.id && <span className="sidebar-active-bar" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-status">
            <span className="status-dot" />
            <div>
              <div className="status-label">API Status</div>
              <div className="status-value">Connected</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
