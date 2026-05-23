import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminLoginPage.css';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFields((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.email || !fields.password) {
      setError('Both fields are required');
      return;
    }
    setLoading(true);
    try {
      await login(fields.email, fields.password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-page">
      <div className="al-orb al-orb-1" />
      <div className="al-orb al-orb-2" />

      <div className="al-wrapper animate-fade-up">
        {/* Branding side */}
        <div className="al-brand">
          <div className="al-brand-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="16" fill="url(#alg1)" />
              <path d="M14 24l7 7 13-13" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="alg1" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6c63ff"/>
                  <stop offset="1" stopColor="#a78bfa"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h2 className="al-brand-name">LeadManager</h2>
          <p className="al-brand-tagline">Admin Portal</p>

          <div className="al-features">
            <div className="al-feature">
              <span className="al-feature-dot" />
              Real-time lead tracking
            </div>
            <div className="al-feature">
              <span className="al-feature-dot" />
              Source analytics & insights
            </div>
            <div className="al-feature">
              <span className="al-feature-dot" />
              Searchable & filterable data
            </div>
          </div>
        </div>

        {/* Login card */}
        <div className="al-card">
          <div className="al-card-header">
            <h1 className="al-title">Welcome back</h1>
            <p className="al-subtitle">Sign in to your admin account</p>
          </div>

          <form className="al-form" onSubmit={handleSubmit} noValidate>
            {error && (
              <div className="alert alert-error animate-fade-in">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4.5v3M7 9v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <div className="al-input-wrap">
                <svg className="al-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M2 6l6 4 6-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  id="email" name="email" type="email"
                  className="form-input al-input"
                  placeholder="admin@leads.com"
                  value={fields.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="al-input-wrap">
                <svg className="al-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="4" y="7" width="8" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  id="password" name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="form-input al-input"
                  placeholder="••••••••"
                  value={fields.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="al-eye-btn"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password"
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8s2-4 6-4 6 4 6 4-2 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3"/><circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3"/></svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary al-submit" disabled={loading}>
              {loading ? (
                <><span className="btn-spinner" /> Signing in...</>
              ) : (
                <>Sign In <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
