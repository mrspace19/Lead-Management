import React from 'react';
import './StatCard.css';

export default function StatCard({ title, value, sub, icon, color = 'accent', trend }) {
  return (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon-wrap">
        {icon}
      </div>
      <div className="stat-body">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value ?? '—'}</div>
        {sub && <div className="stat-sub">{sub}</div>}
      </div>
    </div>
  );
}
