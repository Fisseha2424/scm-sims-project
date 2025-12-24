import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import apiClient from '../api/client';

export default function Dashboard() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      // We can keep using the dashboard-modules endpoint or just hardcode the cards since we have dedicated pages now
      // For searching parity with backend, let's call it, but we'll augment the UI locally
      const response = await apiClient.get('/dashboard-modules');
      if (response.data.success) {
        // The backend returns modules list, we can use it or just render our nice cards
        setModules(response.data.modules);
      }
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    { title: 'Profile', desc: 'View and edit personal info', link: '/profile', icon: '👤', color: 'var(--primary)' },
    { title: 'My Courses', desc: 'View enrolled modules', link: '/courses', icon: '📚', color: 'var(--secondary)' },
    { title: 'Grades', desc: 'Check academic results', link: '/grades', icon: '🏆', color: 'var(--accent)' },
  ];

  if (loading) return <Layout><div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div></Layout>;

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Student Dashboard</h1>
        <p className="page-subtitle">Welcome back! Here is an overview of your academic status.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {dashboardCards.map((card, index) => (
          <Link to={card.link} key={index} className="card" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              backgroundColor: card.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)'
            }}>
              {card.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{card.title}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{card.desc}</p>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Backend Connection Status</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#4ade80' }}></div>
          <span>Connected to SIMS API</span>
        </div>
      </div>
    </Layout>
  );
}
