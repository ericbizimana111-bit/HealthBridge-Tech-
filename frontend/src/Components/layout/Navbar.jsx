import React, { useState, useEffect } from 'react';

export default function Navbar({ page, navigate, isLoggedIn, user, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const navLinks = [
        { key: 'home', label: 'Home' },
        { key: 'doctors', label: 'Find a Doctor' },
        { key: 'community', label: 'Community' },
        { key: 'wellness', label: 'Wellness' },
        { key: 'music', label: '🎵 Calm Music' },
    ];

    const notifications = [
        { icon: '📅', text: 'Session with Dr. Nwosu tomorrow at 3 PM', time: '1h ago' },
        { icon: '💬', text: 'New message from Dr. Tanaka', time: '3h ago' },
        { icon: '💧', text: 'Wellness reminder: time to hydrate!', time: '5h ago' },
    ];

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(16px)',
                borderBottom: scrolled ? '1px solid #cce8e3' : '1px solid transparent',
                boxShadow: scrolled ? '0 2px 20px rgba(11,31,58,0.08)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                fontFamily: "'Poppins', sans-serif",
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

                    {/* Logo */}
                    <button
                        onClick={() => navigate('home')}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        <div style={{
                            width: 38, height: 38, borderRadius: 10,
                            background: 'linear-gradient(135deg, #26b8a0 0%, #0b1f3a 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, flexShrink: 0,
                        }}>🧠</div>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>
                            Sana<span style={{ color: '#26b8a0' }}>Mind</span>
                        </span>
                    </button>

                    {/* Desktop Nav Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: "'Poppins', sans-serif" }} className="desktop-nav">
                        {navLinks.map(link => (
                            <button
                                key={link.key}
                                onClick={() => navigate(link.key)}
                                style={{
                                    padding: '8px 16px',
                                    borderRadius: 50,
                                    background: page === link.key ? '#e6f8f5' : 'none',
                                    color: page === link.key ? '#26b8a0' : '#2c4a5e',
                                    fontWeight: page === link.key ? 600 : 500,
                                    fontSize: 14,
                                    border: 'none', cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                                onMouseEnter={e => { if (page !== link.key) e.target.style.background = '#f0f7f6'; }}
                                onMouseLeave={e => { if (page !== link.key) e.target.style.background = 'none'; }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>

                    {/* Right side */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {isLoggedIn ? (
                            <>
                                {/* Notifications bell */}
                                <div style={{ position: 'relative' }}>
                                    <button
                                        onClick={() => setNotifOpen(!notifOpen)}
                                        style={{
                                            width: 40, height: 40, borderRadius: '50%',
                                            background: notifOpen ? '#e6f8f5' : '#f5fbfa',
                                            border: '1px solid #cce8e3',
                                            fontSize: 16, cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        }}
                                    >
                                        🔔
                                        <span style={{
                                            position: 'absolute', top: 6, right: 6,
                                            width: 8, height: 8, borderRadius: '50%',
                                            background: '#26b8a0', border: '2px solid white',
                                        }} />
                                    </button>
                                    {notifOpen && (
                                        <div style={{
                                            position: 'absolute', top: '110%', right: 0,
                                            width: 300, background: 'white',
                                            borderRadius: 14, border: '1px solid #cce8e3',
                                            boxShadow: '0 8px 32px rgba(11,31,58,0.14)',
                                            zIndex: 200, overflow: 'hidden',
                                        }}>
                                            <div style={{ padding: '14px 16px', borderBottom: '1px solid #e8f5f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 600, fontSize: 14, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Notifications</span>
                                                <span style={{ fontSize: 11, color: '#26b8a0', fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>Mark all read</span>
                                            </div>
                                            {notifications.map((n, i) => (
                                                <div key={i} style={{
                                                    padding: '12px 16px', display: 'flex', gap: 10, alignItems: 'flex-start',
                                                    borderBottom: i < notifications.length - 1 ? '1px solid #f0f7f6' : 'none',
                                                    cursor: 'pointer', transition: 'background 0.15s',
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#f5fbfa'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'white'}
                                                >
                                                    <span style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</span>
                                                    <div>
                                                        <p style={{ fontSize: 13, color: '#0b1f3a', lineHeight: 1.4, fontFamily: "'Poppins', sans-serif" }}>{n.text}</p>
                                                        <p style={{ fontSize: 11, color: '#7a96b4', marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{n.time}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* User avatar */}
                                <button
                                    onClick={() => navigate('dashboard')}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        background: '#f0f7f6', border: '1px solid #cce8e3',
                                        borderRadius: 50, padding: '5px 14px 5px 5px',
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#e6f8f5'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#f0f7f6'}
                                >
                                    <div style={{
                                        width: 30, height: 30, borderRadius: '50%',
                                        background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontSize: 12, fontWeight: 700, fontFamily: "'Poppins', sans-serif",
                                    }}>
                                        {user?.initials || 'U'}
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>
                                        {user?.name?.split(' ')[0] || 'Account'}
                                    </span>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-outline btn-sm" onClick={() => navigate('login')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Log in
                                </button>
                                <button className="btn btn-primary btn-sm" onClick={() => navigate('signup')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Get Started
                                </button>
                            </>
                        )}

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            style={{
                                display: 'none', width: 38, height: 38,
                                background: '#f0f7f6', border: '1px solid #cce8e3',
                                borderRadius: 8, alignItems: 'center', justifyContent: 'center',
                                fontSize: 18, cursor: 'pointer',
                            }}
                            className="hamburger-btn"
                        >
                            {mobileOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div style={{
                        borderTop: '1px solid #cce8e3',
                        background: 'white', padding: '16px',
                    }}>
                        {navLinks.map(link => (
                            <button
                                key={link.key}
                                onClick={() => { navigate(link.key); setMobileOpen(false); }}
                                style={{
                                    display: 'block', width: '100%', textAlign: 'left',
                                    padding: '12px 16px', marginBottom: 4,
                                    borderRadius: 10, background: page === link.key ? '#e6f8f5' : 'none',
                                    color: page === link.key ? '#26b8a0' : '#2c4a5e',
                                    fontWeight: page === link.key ? 600 : 500,
                                    fontSize: 14, border: 'none', cursor: 'pointer',
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                        {!isLoggedIn && (
                            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                <button className="btn btn-outline btn-sm" onClick={() => { navigate('login'); setMobileOpen(false); }} style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }}>Log in</button>
                                <button className="btn btn-primary btn-sm" onClick={() => { navigate('signup'); setMobileOpen(false); }} style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }}>Sign up</button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
        </>
    );
}
