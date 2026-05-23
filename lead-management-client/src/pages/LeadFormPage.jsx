import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import api from '../utils/api';
import Toast from '../components/ui/Toast';
import './LeadFormPage.css';

const SOURCES = ['Website', 'Facebook', 'Google', 'Referral'];

const validate = (fields) => {
  const errors = {};
  if (!fields.fullName.trim()) errors.fullName = 'Full name is required';
  else if (fields.fullName.trim().length < 2) errors.fullName = 'Name must be at least 2 characters';

  if (!fields.email.trim()) errors.email = 'Email is required';
  else if (!/^\S+@\S+\.\S+$/.test(fields.email)) errors.email = 'Enter a valid email address';

  if (!fields.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^\d{10}$/.test(fields.phone)) errors.phone = 'Phone must be exactly 10 digits';

  if (!fields.source) errors.source = 'Please select a source';

  return errors;
};

export default function LeadFormPage() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ fullName: '', email: '', phone: '', source: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [toast, setToast] = useState(null);

  // If already submitted, redirect to thank you
  if (localStorage.getItem('leadSubmitted') === 'true') {
    return <Navigate to="/thank-you" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errs = validate({ ...fields, [name]: value });
      setErrors((prev) => ({ ...prev, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate(fields);
    setErrors((prev) => ({ ...prev, [name]: errs[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = { fullName: true, email: true, phone: true, source: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setApiError('');
    setToast(null);
    try {
      await api.post('/leads', fields);
      localStorage.setItem('leadSubmitted', 'true');
      navigate('/thank-you');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Something went wrong. Please try again.';
      // Check if it's a duplicate email/phone error
      if (err.response?.status === 409) {
        setToast({ message: errorMessage, type: 'error' });
      } else {
        setApiError(errorMessage);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="lf-page">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={4000}
          onClose={() => setToast(null)}
        />
      )}

      {/* Background orbs */}
      <div className="lf-orb lf-orb-1" />
      <div className="lf-orb lf-orb-2" />

      <div className="lf-container animate-fade-up">
        {/* Header */}
        <div className="lf-header">
          <div className="lf-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="10" fill="url(#g1)" />
              <path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6c63ff"/>
                  <stop offset="1" stopColor="#a78bfa"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="lf-title">Get in Touch</h1>
          <p className="lf-subtitle">Fill in your details and our team will reach out to you shortly.</p>
        </div>

        {/* Form */}
        <form className="lf-form" onSubmit={handleSubmit} noValidate>
          {apiError && (
            <div className="alert alert-error animate-fade-in">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              {apiError}
            </div>
          )}

          <div className="lf-grid">
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <input
                id="fullName" name="fullName" type="text"
                className={`form-input ${errors.fullName && touched.fullName ? 'error' : ''}`}
                placeholder="John Doe"
                value={fields.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="name"
              />
              {errors.fullName && touched.fullName && (
                <span className="field-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none"/><path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {errors.fullName}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email" name="email" type="email"
                className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                placeholder="john@example.com"
                value={fields.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="email"
              />
              {errors.email && touched.email && (
                <span className="field-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none"/><path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {errors.email}
                </span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input
                id="phone" name="phone" type="tel"
                className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                placeholder="10-digit number"
                value={fields.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={10}
                autoComplete="tel"
              />
              {errors.phone && touched.phone && (
                <span className="field-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none"/><path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {errors.phone}
                </span>
              )}
            </div>

            {/* Source */}
            <div className="form-group">
              <label className="form-label" htmlFor="source">How did you hear about us?</label>
              <select
                id="source" name="source"
                className={`form-select ${errors.source && touched.source ? 'error' : ''}`}
                value={fields.source}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Select a source</option>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              {errors.source && touched.source && (
                <span className="field-error">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><circle cx="6" cy="6" r="5.5" stroke="currentColor" strokeWidth="1" fill="none"/><path d="M6 4v2.5M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                  {errors.source}
                </span>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary lf-submit" disabled={submitting}>
            {submitting ? (
              <>
                <span className="btn-spinner" />
                Submitting...
              </>
            ) : (
              <>
                Submit
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>
        </form>

        <p className="lf-footer-note">
          Your information is safe with us. We'll never share it without permission.
        </p>
      </div>
    </div>
  );
}
