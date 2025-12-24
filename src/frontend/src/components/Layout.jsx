import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

export default function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // Get user from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                // Call API logout but don't block if it fails
                fetch('http://localhost:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }).catch(err => console.error(err));
            } catch (error) {
                console.error('Logout failed', error);
            }
        }
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--primary)' }}>
                        <img src={logo} alt="AASTU" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="sidebar-logo" style={{ fontSize: '1.25rem', margin: 0 }}>AASTU SIMS</div>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div className="nav-label">Academic</div>

                    <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        Profile
                    </NavLink>
                    <NavLink to="/courses" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        My Courses
                    </NavLink>
                    <NavLink to="/grades" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        Grades
                    </NavLink>

                    <div className="nav-label" style={{ marginTop: '1.5rem' }}>Administrative</div>

                    <div className="nav-item disabled" title="Available soon">
                        Financials <span className="badge-soon">Soon</span>
                    </div>
                    <div className="nav-item disabled" title="Available soon">
                        Dormitory <span className="badge-soon">Soon</span>
                    </div>

                    <div className="nav-label" style={{ marginTop: '1.5rem' }}>Resources</div>

                    <div className="nav-item disabled" title="Available soon">
                        Digital Library <span className="badge-soon">Soon</span>
                    </div>
                    <div className="nav-item disabled" title="Available soon">
                        Class Schedule <span className="badge-soon">Soon</span>
                    </div>
                </nav>

                <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius)', marginTop: 'auto' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Logged in as</div>
                    <div style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name || 'Student'}</div>
                </div>
            </aside>

            <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
                <header className="topbar" style={{
                    height: '70px',
                    background: 'var(--bg-card)',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 2rem'
                }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-main)' }}>
                        {location.pathname === '/dashboard' && 'Dashboard'}
                        {location.pathname === '/profile' && 'My Profile'}
                        {location.pathname === '/courses' && 'Enrolled Courses'}
                        {location.pathname === '/grades' && 'Academic Results'}
                    </h2>

                    <div style={{ position: 'relative' }}>
                        <div
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius)',
                                transition: 'background 0.2s'
                            }}
                            className="user-menu-trigger"
                        >
                            <div style={{ textAlign: 'right', display: 'none', md: 'block' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.student_id}</div>
                            </div>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                color: 'white',
                                boxShadow: '0 2px 10px rgba(79, 70, 229, 0.3)'
                            }}>
                                {user.name ? user.name.charAt(0) : 'S'}
                            </div>
                        </div>

                        {showProfileMenu && (
                            <div style={{
                                position: 'absolute',
                                top: '100%',
                                right: 0,
                                marginTop: '0.5rem',
                                width: '200px',
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                boxShadow: 'var(--shadow-lg)',
                                zIndex: 100,
                                overflow: 'hidden'
                            }}>
                                <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Signed in as</div>
                                    <div style={{ fontWeight: 600 }}>{user.email || 'Student'}</div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 1rem',
                                        textAlign: 'left',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#fca5a5',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}
                                    className="menu-item"
                                >
                                    <span>🚪</span> Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <main className="main-content" style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
