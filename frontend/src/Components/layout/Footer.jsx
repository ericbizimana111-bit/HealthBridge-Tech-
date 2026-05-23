

export default function Footer({ navigate }) {
    const year = new Date().getFullYear();

    const links = {
        Platform: [
            { label: 'Find a Doctor', key: 'doctors' },
            { label: 'Community', key: 'community' },
            { label: 'Wellness Hub', key: 'wellness' },
            { label: 'Calm Music', key: 'music' },
        ],
        Support: [
            { label: 'How It Works', key: 'home' },
            { label: 'FAQs', key: 'home' },
            { label: 'Contact Us', key: 'home' },
            { label: 'Privacy Policy', key: 'home' },
        ],
        Account: [
            { label: 'Log In', key: 'login' },
            { label: 'Sign Up', key: 'signup' },
            { label: 'Dashboard', key: 'dashboard' },
            { label: 'Settings', key: 'dashboard' },
        ],
    };

    return (
        <footer style={{
            background: 'var(--navy)',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: "'Poppins', sans-serif",
            paddingTop: 72,
        }}>
            <div className="container">
                {/* Top row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr repeat(3, 1fr)',
                    gap: 48,
                    paddingBottom: 56,
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }} className="footer-grid">

                    {/* Brand */}
                    <div>
                        <button onClick={() => navigate('home')} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: 'none', border: 'none', cursor: 'pointer', marginBottom: 18,
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: 'linear-gradient(135deg,#26b8a0,#34d4ba)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 20,
                            }}>🧠</div>
                            <span style={{ fontSize: 22, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif" }}>
                                Sana<span style={{ color: '#26b8a0' }}>Mind</span>
                            </span>
                        </button>
                        <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', maxWidth: 280, fontFamily: "'Poppins', sans-serif" }}>
                            Connecting people with trusted healthcare professionals — anytime, anywhere.
                            Your wellbeing is our purpose.
                        </p>
                        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
                            {['🐦', '💼', '📸', '▶️'].map((icon, i) => (
                                <button key={i} style={{
                                    width: 36, height: 36, borderRadius: 8,
                                    background: 'rgba(255,255,255,0.08)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    fontSize: 15, cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transition: 'all 0.2s',
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(38,184,160,0.25)'; e.currentTarget.style.borderColor = '#26b8a0'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                                >{icon}</button>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([section, items]) => (
                        <div key={section}>
                            <h4 style={{ fontSize: 13, fontWeight: 700, color: 'white', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>
                                {section}
                            </h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {items.map(item => (
                                    <li key={item.label}>
                                        <button
                                            onClick={() => navigate(item.key)}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                fontSize: 14, color: 'rgba(255,255,255,0.6)',
                                                fontFamily: "'Poppins', sans-serif",
                                                transition: 'color 0.2s', padding: 0,
                                            }}
                                            onMouseEnter={e => e.target.style.color = '#26b8a0'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
                                        >
                                            {item.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter strip */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 20,
                    padding: '36px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}>
                    <div>
                        <p style={{ fontSize: 15, fontWeight: 600, color: 'white', fontFamily: "'Poppins', sans-serif", marginBottom: 4 }}>
                            Weekly Wellness Digest
                        </p>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: "'Poppins', sans-serif" }}>
                            Gentle tips, inspiring stories, and professional insights — every Monday.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 0 }}>
                        <input
                            placeholder="Your email address"
                            style={{
                                padding: '12px 18px',
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.18)',
                                borderRight: 'none',
                                borderRadius: '50px 0 0 50px',
                                color: 'white',
                                fontSize: 14,
                                width: 260,
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        />
                        <button style={{
                            padding: '12px 22px',
                            background: '#26b8a0',
                            border: '1px solid #26b8a0',
                            borderRadius: '0 50px 50px 0',
                            color: 'white', fontWeight: 600, fontSize: 14,
                            cursor: 'pointer', transition: 'background 0.2s',
                            fontFamily: "'Poppins', sans-serif",
                        }}
                            onMouseEnter={e => e.currentTarget.style.background = '#34d4ba'}
                            onMouseLeave={e => e.currentTarget.style.background = '#26b8a0'}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 12, padding: '24px 0',
                }}>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontFamily: "'Poppins', sans-serif" }}>
                        © {year} SanaMind Technologies. All rights reserved. Built with care for your wellbeing.
                    </p>
                    <div style={{ display: 'flex', gap: 20 }}>
                        {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map(t => (
                            <button key={t} style={{
                                fontSize: 12, color: 'rgba(255,255,255,0.35)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif", transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.color = '#26b8a0'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.35)'}
                            >{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </footer>
    );
}
