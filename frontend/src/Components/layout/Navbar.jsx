import React, { useState, useEffect } from 'react';

export default function Navbar({ page, navigate, isLoggedIn, user, onLogout }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobile] = useState(false);
    const [notifOpen, setNotif] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Close dropdowns when page changes
    useEffect(() => { setNotif(false); setUserOpen(false); setMobile(false); }, [page]);

    const navLinks = [
        { key: 'home', label: 'Home' },
        { key: 'doctors', label: 'Find a Doctor' },
        { key: 'community', label: 'Community' },
        { key: 'wellness', label: 'Wellness' },
        { key: 'music', label: '🎵 Calm Music' },
        { key: 'about', label: 'About' },
        { key: 'testimonials', label: 'Testimonials' },
        { key: 'contact', label: 'Contact' },
    ];

    const notifications = [
        { icon: '📅', text: 'Session with Dr. Nwosu tomorrow at 3 PM', time: '1h ago' },
        { icon: '💬', text: 'New message from Dr. Tanaka', time: '3h ago' },
        { icon: '💧', text: 'Wellness reminder: time to hydrate!', time: '5h ago' },
    ];

    const activeLink = (key) => page === key;

    return (
        <>
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(18px)',
                borderBottom: scrolled ? '1px solid #cce8e3' : '1px solid transparent',
                boxShadow: scrolled ? '0 2px 24px rgba(11,31,58,0.09)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                fontFamily: "'Poppins', sans-serif",
            }}>
                <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

                    {/* ── Logo ── */}
                    <button onClick={() => navigate('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer' }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🧠</div>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>
                            Sana<span style={{ color: '#26b8a0' }}>Mind</span>
                        </span>
                    </button>

                    {/* ── Desktop links ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
                        {navLinks.map(link => (
                            <button key={link.key} onClick={() => navigate(link.key)} style={{
                                padding: '7px 13px', borderRadius: 50,
                                background: activeLink(link.key) ? '#e6f8f5' : 'none',
                                color: activeLink(link.key) ? '#26b8a0' : '#2c4a5e',
                                fontWeight: activeLink(link.key) ? 600 : 500,
                                fontSize: 13, border: 'none', cursor: 'pointer',
                                transition: 'all 0.2s', fontFamily: "'Poppins', sans-serif",
                                whiteSpace: 'nowrap',
                            }}
                                onMouseEnter={e => { if (!activeLink(link.key)) e.currentTarget.style.background = '#f0f7f6'; }}
                                onMouseLeave={e => { if (!activeLink(link.key)) e.currentTarget.style.background = 'none'; }}
                            >{link.label}</button>
                        ))}
                    </div>

                    {/* ── Right actions ── */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        {isLoggedIn ? (
                            <>
                                {/* Notifications */}
                                <div style={{ position: 'relative' }}>
                                    <button onClick={() => { setNotif(!notifOpen); setUserOpen(false); }} style={{
                                        width: 38, height: 38, borderRadius: '50%',
                                        background: notifOpen ? '#e6f8f5' : '#f5fbfa',
                                        border: '1px solid #cce8e3', fontSize: 15, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        position: 'relative', transition: 'background 0.18s',
                                    }}>
                                        🔔
                                        <span style={{ position: 'absolute', top: 7, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#26b8a0', border: '2px solid white' }} />
                                    </button>
                                    {notifOpen && (
                                        <div style={{ position: 'absolute', top: '110%', right: 0, width: 300, background: 'white', borderRadius: 16, border: '1px solid #cce8e3', boxShadow: '0 10px 40px rgba(11,31,58,0.14)', zIndex: 300, overflow: 'hidden' }}>
                                            <div style={{ padding: '14px 18px', borderBottom: '1px solid #e8f5f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 700, fontSize: 14, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Notifications</span>
                                                <button onClick={() => navigate('notifications')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: '#26b8a0', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>See all</button>
                                            </div>
                                            {notifications.map((n, i) => (
                                                <div key={i} style={{ padding: '12px 18px', display: 'flex', gap: 10, alignItems: 'flex-start', borderBottom: i < notifications.length - 1 ? '1px solid #f0f7f6' : 'none', cursor: 'pointer' }}
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

                                {/* User avatar + dropdown */}
                                <div style={{ position: 'relative' }}>
                                    <button onClick={() => { setUserOpen(!userOpen); setNotif(false); }} style={{
                                        display: 'flex', alignItems: 'center', gap: 8,
                                        background: '#f0f7f6', border: '1px solid #cce8e3',
                                        borderRadius: 50, padding: '5px 12px 5px 5px',
                                        cursor: 'pointer', transition: 'background 0.18s',
                                    }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#e6f8f5'}
                                        onMouseLeave={e => e.currentTarget.style.background = '#f0f7f6'}
                                    >
                                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}>
                                            {user?.initials || 'U'}
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>
                                            {user?.name?.split(' ')[0] || 'Account'}
                                        </span>
                                        <span style={{ fontSize: 10, color: '#7a96b4' }}>▼</span>
                                    </button>

                                    {userOpen && (
                                        <div style={{ position: 'absolute', top: '110%', right: 0, width: 200, background: 'white', borderRadius: 16, border: '1px solid #cce8e3', boxShadow: '0 10px 40px rgba(11,31,58,0.14)', zIndex: 300, overflow: 'hidden', padding: '8px 0' }}>
                                            {[
                                                { label: 'My Dashboard', key: 'dashboard' },
                                                { label: 'Notifications', key: 'notifications' },
                                                { label: 'Find a Doctor', key: 'doctors' },
                                                { label: 'Community', key: 'community' },
                                            ].map(item => (
                                                <button key={item.key} onClick={() => navigate(item.key)} style={{
                                                    display: 'block', width: '100%', textAlign: 'left',
                                                    padding: '10px 18px', background: 'none', border: 'none',
                                                    fontSize: 13, color: '#0b1f3a', cursor: 'pointer',
                                                    fontFamily: "'Poppins', sans-serif", transition: 'background 0.15s',
                                                }}
                                                    onMouseEnter={e => e.currentTarget.style.background = '#f5fbfa'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                                >{item.label}</button>
                                            ))}
                                            <div style={{ height: 1, background: '#f0f7f6', margin: '6px 0' }} />
                                            <button onClick={onLogout} style={{
                                                display: 'block', width: '100%', textAlign: 'left',
                                                padding: '10px 18px', background: 'none', border: 'none',
                                                fontSize: 13, color: '#e57373', cursor: 'pointer',
                                                fontFamily: "'Poppins', sans-serif", transition: 'background 0.15s',
                                            }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#fff5f5'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'none'}
                                            >Log Out</button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <button className="btn btn-outline btn-sm" onClick={() => navigate('login')} style={{ fontFamily: "'Poppins', sans-serif" }}>Log in</button>
                                <button className="btn btn-primary btn-sm" onClick={() => navigate('signup')} style={{ fontFamily: "'Poppins', sans-serif" }}>Get Started</button>
                            </>
                        )}

                        {/* Hamburger */}
                        <button onClick={() => setMobile(!mobileOpen)} className="hamburger-btn" style={{
                            display: 'none', width: 38, height: 38,
                            background: '#f0f7f6', border: '1px solid #cce8e3',
                            borderRadius: 9, alignItems: 'center', justifyContent: 'center',
                            fontSize: 18, cursor: 'pointer',
                        }}>{mobileOpen ? '✕' : '☰'}</button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div style={{ background: 'white', borderTop: '1px solid #cce8e3', padding: 16, maxHeight: '80vh', overflowY: 'auto' }}>
                        {navLinks.map(link => (
                            <button key={link.key} onClick={() => navigate(link.key)} style={{
                                display: 'block', width: '100%', textAlign: 'left',
                                padding: '11px 14px', marginBottom: 4, borderRadius: 10,
                                background: activeLink(link.key) ? '#e6f8f5' : 'none',
                                color: activeLink(link.key) ? '#26b8a0' : '#2c4a5e',
                                fontWeight: activeLink(link.key) ? 600 : 500,
                                fontSize: 14, border: 'none', cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif",
                            }}>{link.label}</button>
                        ))}
                        {!isLoggedIn && (
                            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                <button className="btn btn-outline btn-sm" onClick={() => navigate('login')} style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }}>Log in</button>
                                <button className="btn btn-primary btn-sm" onClick={() => navigate('signup')} style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }}>Sign up</button>
                            </div>
                        )}
                    </div>
                )}
            </nav>

            <style>{`
        @media (max-width: 1024px) { .desktop-nav { display: none !important; } }
        @media (max-width: 1024px) { .hamburger-btn { display: flex !important; } }
      `}</style>
        </>
    );
}
