import React, {useState} from "react";

export default function Footer({ navigate }) {
    const [email, setEmail] = useState('');
    const [subscribed, setSub] = useState(false);
    const year = new Date().getFullYear();

    const links = {
        Platform: [
            { label: 'Find a Doctor', key: 'doctors' },
            { label: 'Community', key: 'community' },
            { label: 'Wellness Hub', key: 'wellness' },
            { label: 'Calm Music', key: 'music' },
            { label: 'Video Consult', key: 'video-call' },
        ],
        Company: [
            { label: 'About Us', key: 'about' },
            { label: 'Testimonials', key: 'testimonials' },
            { label: 'Contact Us', key: 'contact' },
            { label: 'For Doctors', key: 'signup' },
            { label: 'Notifications', key: 'notifications' },
        ],
        Account: [
            { label: 'Log In', key: 'login' },
            { label: 'Sign Up Free', key: 'signup' },
            { label: 'My Dashboard', key: 'dashboard' },
            { label: 'Find a Doctor', key: 'doctors' },
        ],
    };

    const social = [
        { icon: '𝕏', label: 'Twitter / X' },
        { icon: 'in', label: 'LinkedIn' },
        { icon: '▶', label: 'YouTube' },
        { icon: 'f', label: 'Facebook' },
    ];

    return (
        <footer style={{
            background: '#0b1f3a',
            color: 'rgba(255,255,255,0.8)',
            fontFamily: "'Poppins', sans-serif",
            paddingTop: 72,
        }}>
            <div className="container">

                {/* ── Main grid ── */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: 48,
                    paddingBottom: 56,
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }} className="footer-main">

                    {/* Brand column */}
                    <div>
                        {/* Logo */}
                        <button
                            onClick={() => navigate('home')}
                            style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', marginBottom: 20 }}
                        >
                            <div style={{ width: 42, height: 42, borderRadius: 11, background: 'linear-gradient(135deg,#26b8a0,#34d4ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>🧠</div>
                            <span style={{ fontSize: 22, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif" }}>
                                Sana<span style={{ color: '#26b8a0' }}>Mind</span>
                            </span>
                        </button>

                        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: 300, marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>
                            Connecting people with trusted healthcare professionals — anytime, anywhere. Your wellbeing is our purpose.
                        </p>

                        {/* Social */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            {social.map(s => (
                                <button key={s.label} title={s.label} style={{
                                    width: 38, height: 38, borderRadius: 9,
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.6)',
                                    fontSize: 13, fontWeight: 700,
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(38,184,160,0.25)'; e.currentTarget.style.borderColor = '#26b8a0'; e.currentTarget.style.color = '#26b8a0'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                                >{s.icon}</button>
                            ))}
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(links).map(([section, items]) => (
                        <div key={section}>
                            <h4 style={{
                                fontSize: 12, fontWeight: 700, color: 'white',
                                letterSpacing: 1.4, textTransform: 'uppercase',
                                marginBottom: 20, fontFamily: "'Poppins', sans-serif",
                            }}>{section}</h4>
                            <ul style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                                {items.map(item => (
                                    <li key={item.label}>
                                        <button
                                            onClick={() => navigate(item.key)}
                                            style={{
                                                background: 'none', border: 'none', cursor: 'pointer',
                                                fontSize: 14, color: 'rgba(255,255,255,0.55)',
                                                fontFamily: "'Poppins', sans-serif",
                                                transition: 'color 0.2s', padding: 0,
                                                textAlign: 'left',
                                            }}
                                            onMouseEnter={e => e.target.style.color = '#26b8a0'}
                                            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                                        >{item.label}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* ── Newsletter strip ── */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 24,
                    padding: '40px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                }}>
                    <div>
                        <p style={{ fontSize: 16, fontWeight: 700, color: 'white', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>
                            Weekly Wellness Digest
                        </p>
                        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>
                            Gentle tips, inspiring stories, and professional insights — every Monday.
                        </p>
                    </div>
                    {subscribed ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(38,184,160,0.15)', border: '1px solid rgba(38,184,160,0.3)', borderRadius: 50, padding: '10px 22px' }}>
                            <span>✅</span>
                            <span style={{ fontSize: 14, color: '#9de4d8', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>You are subscribed!</span>
                        </div>
                    ) : (
                        <div style={{ display: 'flex' }}>
                            <input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Your email address"
                                style={{
                                    padding: '12px 20px',
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.15)',
                                    borderRight: 'none',
                                    borderRadius: '50px 0 0 50px',
                                    color: 'white',
                                    fontSize: 14, width: 270,
                                    fontFamily: "'Poppins', sans-serif",
                                    outline: 'none',
                                }}
                                onFocus={e => e.target.style.borderColor = 'rgba(38,184,160,0.5)'}
                                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                            />
                            <button
                                onClick={() => { if (email.includes('@')) setSub(true); }}
                                style={{
                                    padding: '12px 24px',
                                    background: '#26b8a0',
                                    border: '1px solid #26b8a0',
                                    borderRadius: '0 50px 50px 0',
                                    color: 'white', fontWeight: 600, fontSize: 14,
                                    cursor: 'pointer', transition: 'background 0.2s',
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = '#34d4ba'}
                                onMouseLeave={e => e.currentTarget.style.background = '#26b8a0'}
                            >Subscribe</button>
                        </div>
                    )}
                </div>

                {/* ── Bottom bar ── */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    flexWrap: 'wrap', gap: 12, padding: '24px 0',
                }}>
                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: "'Poppins', sans-serif" }}>
                        © {year} SanaMind Technologies Ltd. All rights reserved. Built with care for your wellbeing.
                    </p>
                    <div style={{ display: 'flex', gap: 22 }}>
                        {['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'].map(t => (
                            <button key={t} style={{
                                fontSize: 12, color: 'rgba(255,255,255,0.32)',
                                background: 'none', border: 'none', cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif", transition: 'color 0.2s',
                            }}
                                onMouseEnter={e => e.target.style.color = '#26b8a0'}
                                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.32)'}
                            >{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .footer-main { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-main { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </footer>
    );
}
