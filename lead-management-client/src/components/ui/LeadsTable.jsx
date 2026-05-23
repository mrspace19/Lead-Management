import React, { useState } from 'react';
import api from '../../utils/api';
import './LeadsTable.css';

const SOURCE_BADGE = {
  Website:  'badge-website',
  Facebook: 'badge-facebook',
  Google:   'badge-google',
  Referral: 'badge-referral',
};

const SOURCE_ICON = {
  Website:  '🌐',
  Facebook: '📘',
  Google:   '🔍',
  Referral: '🤝',
};

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    + ' · '
    + d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

export default function LeadsTable({ leads, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/leads/${id}`);
      onDelete(id);
    } catch (err) {
      alert('Failed to delete lead');
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (leads.length === 0) {
    return (
      <div className="leads-empty">
        <div className="leads-empty-icon">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="var(--clr-border)" strokeWidth="2"/>
            <path d="M24 24a8 8 0 100-16 8 8 0 000 16z" stroke="var(--clr-text-dim)" strokeWidth="1.5"/>
            <path d="M10 40c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="var(--clr-text-dim)" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="leads-empty-title">No leads found</p>
        <p className="leads-empty-sub">Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="leads-table-wrap">
      <table className="leads-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Source</th>
            <th>Date & Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, i) => (
            <tr key={lead._id} className="leads-row animate-fade-in">
              <td className="lead-num">{i + 1}</td>
              <td>
                <div className="lead-name-cell">
                  <div className="lead-avatar">
                    {lead.fullName[0].toUpperCase()}
                  </div>
                  <span className="lead-name">{lead.fullName}</span>
                </div>
              </td>
              <td>
                <a href={`mailto:${lead.email}`} className="lead-email">{lead.email}</a>
              </td>
              <td className="lead-phone">
                <a href={`tel:${lead.phone}`}>{lead.phone}</a>
              </td>
              <td>
                <span className={`badge ${SOURCE_BADGE[lead.source] || ''}`}>
                  {SOURCE_ICON[lead.source]} {lead.source}
                </span>
              </td>
              <td className="lead-date">{formatDate(lead.createdAt)}</td>
              <td>
                {confirmId === lead._id ? (
                  <div className="lead-confirm">
                    <span className="confirm-text">Sure?</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(lead._id)}
                      disabled={deletingId === lead._id}
                    >
                      {deletingId === lead._id ? '...' : 'Yes'}
                    </button>
                    <button className="btn btn-sm btn-ghost" onClick={() => setConfirmId(null)}>No</button>
                  </div>
                ) : (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => setConfirmId(lead._id)}
                  >
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 3.5h9M5 3.5V2.5h3v1M5.5 6v3.5M7.5 6v3.5M3 3.5l.5 7h6l.5-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
