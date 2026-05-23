import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import Footer from '../components/layout/Footer';
import StatCard from '../components/ui/StatCard';
import LeadsTable from '../components/ui/LeadsTable';
import api from '../utils/api';
import './DashboardPage.css';

const SOURCES = ['All', 'Website', 'Facebook', 'Google', 'Referral'];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, today: 0, bySource: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [sort, setSort] = useState('newest');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (search)                  params.set('search', search);
      if (sourceFilter !== 'All') params.set('source', sourceFilter);
      params.set('sort', sort);

      const { data } = await api.get(`/leads?${params}`);
      setLeads(data.leads);
      setStats(data.stats);
    } catch (err) {
      setError('Failed to load leads. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [search, sourceFilter, sort]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  // Debounced search
  useEffect(() => {
    const t = setTimeout(fetchLeads, 350);
    return () => clearTimeout(t);
  }, [search]);

  const handleDelete = (id) => {
    setLeads((prev) => prev.filter((l) => l._id !== id));
    setStats((prev) => ({ ...prev, total: prev.total - 1 }));
  };

  const getSourceCount = (src) => {
    const found = stats.bySource?.find((s) => s._id === src);
    return found?.count ?? 0;
  };

  return (
    <div className={`dash-layout ${sidebarOpen ? 'sidebar-visible' : ''}`}>
      <Navbar
        onMenuToggle={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
      />

      <Sidebar
        open={sidebarOpen}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth < 768) setSidebarOpen(false);
        }}
      />

      <main className="dash-main">
        <div className="dash-content">

          {/* ── Page Header ── */}
          <div className="dash-page-header animate-fade-up">
            <div>
              <h1 className="dash-page-title">
                {activeTab === 'overview' ? 'Overview' : 'All Leads'}
              </h1>
              <p className="dash-page-sub">
                {activeTab === 'overview'
                  ? 'Summary of your lead activity'
                  : `${stats.total} total leads collected`}
              </p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={fetchLeads}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12 7A5 5 0 112 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <path d="M12 3v4h-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
            </button>
          </div>

          {error && (
            <div className="alert alert-error animate-fade-in" style={{ marginBottom: 20 }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M7 4.5v3M7 9v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              {error}
            </div>
          )}

          {/* ── OVERVIEW TAB ── */}
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div className="stats-grid animate-fade-up">
                <StatCard
                  title="Total Leads"
                  value={stats.total}
                  sub="All time"
                  color="accent"
                  icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.6"/><path d="M4 19c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
                />
                <StatCard
                  title="Today's Leads"
                  value={stats.today}
                  sub="Since midnight"
                  color="success"
                  icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M7 3v4M15 3v4M3 11h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
                />
                <StatCard
                  title="Website"
                  value={getSourceCount('Website')}
                  sub="from website traffic"
                  color="info"
                  icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M11 3c-2 2.5-2 13.5 0 16M3 11h16" stroke="currentColor" strokeWidth="1.4"/><path d="M4.5 7.5C6.2 8.8 9 9.5 11 9.5s4.8-.7 6.5-2M4.5 14.5c1.7-1.3 4.5-2 6.5-2s4.8.7 6.5 2" stroke="currentColor" strokeWidth="1.4"/></svg>}
                />
                <StatCard
                  title="Referral"
                  value={getSourceCount('Referral')}
                  sub="word of mouth"
                  color="warning"
                  icon={<svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M7 8a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6"/><path d="M1 18c0-3.314 2.686-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M15 8a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.6"/><path d="M21 18c0-3.314-2.686-6-6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
                />
              </div>

              {/* Source Breakdown */}
              <div className="overview-cards animate-fade-up">
                <div className="section-card">
                  <div className="section-card-header">
                    <h2 className="section-card-title">Leads by Source</h2>
                    <span className="section-card-count">{stats.total} total</span>
                  </div>
                  <div className="source-bars">
                    {['Website', 'Facebook', 'Google', 'Referral'].map((src) => {
                      const count = getSourceCount(src);
                      const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0;
                      const barColors = {
                        Website: 'var(--clr-info)',
                        Facebook: '#60a5fa',
                        Google: 'var(--clr-warning)',
                        Referral: 'var(--clr-success)',
                      };
                      return (
                        <div className="source-bar-item" key={src}>
                          <div className="source-bar-label">
                            <span>{src}</span>
                            <span className="source-bar-count">{count}</span>
                          </div>
                          <div className="source-bar-track">
                            <div
                              className="source-bar-fill"
                              style={{ width: `${pct}%`, background: barColors[src] }}
                            />
                          </div>
                          <span className="source-bar-pct">{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent leads mini-table */}
                <div className="section-card">
                  <div className="section-card-header">
                    <h2 className="section-card-title">Recent Leads</h2>
                    <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('leads')}>
                      View all →
                    </button>
                  </div>
                  {leads.slice(0, 5).length === 0 ? (
                    <p style={{ color: 'var(--clr-text-dim)', fontSize: '0.88rem', padding: '16px 0' }}>
                      No leads yet.
                    </p>
                  ) : (
                    <div className="recent-leads">
                      {leads.slice(0, 5).map((lead) => (
                        <div className="recent-lead-row" key={lead._id}>
                          <div className="lead-avatar mini">
                            {lead.fullName[0].toUpperCase()}
                          </div>
                          <div className="recent-lead-info">
                            <span className="recent-lead-name">{lead.fullName}</span>
                            <span className="recent-lead-email">{lead.email}</span>
                          </div>
                          <span className={`badge ${
                            lead.source === 'Website' ? 'badge-website' :
                            lead.source === 'Facebook' ? 'badge-facebook' :
                            lead.source === 'Google' ? 'badge-google' : 'badge-referral'
                          }`}>
                            {lead.source}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── LEADS TAB ── */}
          {activeTab === 'leads' && (
            <>
              {/* Filters */}
              <div className="leads-controls animate-fade-up">
                <div className="leads-search-wrap">
                  <svg className="leads-search-icon" width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  <input
                    type="text"
                    className="form-input leads-search"
                    placeholder="Search by name, email, or phone…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="leads-filter-row">
                  <div className="source-tabs">
                    {SOURCES.map((s) => (
                      <button
                        key={s}
                        className={`source-tab ${sourceFilter === s ? 'active' : ''}`}
                        onClick={() => setSourceFilter(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <select
                    className="form-select sort-select"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="table-loading">
                  <div className="loader-ring" />
                  <span>Loading leads…</span>
                </div>
              ) : (
                <div className="animate-fade-up">
                  <LeadsTable leads={leads} onDelete={handleDelete} />
                  <div className="table-footer-meta">
                    Showing <strong>{leads.length}</strong> of <strong>{stats.total}</strong> leads
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}
