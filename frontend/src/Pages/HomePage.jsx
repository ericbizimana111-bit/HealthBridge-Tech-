import { useState, useEffect, useRef } from 'react';
import { stats, testimonials, faqs, motivationalMessages, wellnessTips, doctors } from '../data/mockData';

/* ── tiny reusable counter hook ── */
function useCountUp(target, duration = 1600, start = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!start) return;
        const num = parseInt(target.replace(/\D/g, ''));
        if (!num) return;
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setVal(Math.floor(progress * num));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return val;
}

function StatCard({ stat, started }) {
    const num = useCountUp(stat.value, 1600, started);
    const suffix = stat.value.replace(/[\d,]/g, '');
    return (
        <div style={{
            textAlign: 'center', padding: '36px 24px',
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 18, border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(8px)',
        }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: '#26b8a0', fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>
                {stat.value.includes('%') ? `${num}%` : stat.value.includes('+') ? `${num.toLocaleString()}+` : stat.value}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', marginTop: 8, fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>
                {stat.label}
            </div>
        </div>
    );
}

function FAQItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{
            border: '1px solid #cce8e3', borderRadius: 14,
            overflow: 'hidden', transition: 'box-shadow 0.2s',
            boxShadow: open ? '0 4px 20px rgba(38,184,160,0.1)' : 'none',
        }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', padding: '20px 24px',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: open ? '#f0faf8' : 'white',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.2s', fontFamily: "'Poppins', sans-serif",
                }}
            >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{q}</span>
                <span style={{
                    fontSize: 18, color: '#26b8a0', flexShrink: 0, marginLeft: 12,
                    transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.25s',
                    fontFamily: "'Poppins', sans-serif",
                }}>+</span>
            </button>
            {open && (
                <div style={{ padding: '0 24px 20px', background: '#f0faf8' }}>
                    <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.75, fontFamily: "'Poppins', sans-serif" }}>{a}</p>
                </div>
            )}
        </div>
    );
}

export default function HomePage({ navigate, isLoggedIn }) {
    const [msgIndex, setMsgIndex] = useState(0);
    const [statsStarted, setStatsStarted] = useState(false);
    const statsRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setMsgIndex(i => (i + 1) % motivationalMessages.length), 4000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setStatsStarted(true);
        }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const categories = [
        { icon: '🧠', label: 'Mental Health', color: '#e6f8f5' },
        { icon: '💔', label: 'Trauma Support', color: '#fde8f0' },
        { icon: '😮‍💨', label: 'Stress & Burnout', color: '#e8eeff' },
        { icon: '👨‍👩‍👧', label: 'Family Therapy', color: '#fff5e6' },
        { icon: '🧒', label: 'Child Specialists', color: '#e8f5e0' },
        { icon: '🥗', label: 'Nutrition', color: '#fdf5e0' },
    ];

    const howItWorks = [
        { step: '01', title: 'Create Your Profile', desc: 'Sign up in under two minutes. Tell us a little about yourself so we can personalise your experience.' },
        { step: '02', title: 'Find Your Professional', desc: 'Browse our vetted doctors and counsellors. Filter by speciality, language, and availability.' },
        { step: '03', title: 'Book a Session', desc: 'Schedule a secure video call or start a chat — at a time that fits your life, from any device.' },
        { step: '04', title: 'Heal & Grow', desc: 'Follow personalised wellness plans, join community support, and track your progress over time.' },
    ];

    return (
        <div style={{ fontFamily: "'Poppins', sans-serif" }}>

            {/* ── MOTIVATION BANNER ── */}
            <div style={{
                background: 'linear-gradient(90deg,#26b8a0,#0b1f3a)',
                padding: '10px 0', textAlign: 'center',
            }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>
                    ✨ {motivationalMessages[msgIndex]}
                </p>
            </div>

            {/* ── HERO ── */}
            <section style={{
                background: 'linear-gradient(145deg, #0b1f3a 0%, #1e3f6e 55%, #162d50 100%)',
                minHeight: '92vh', display: 'flex', alignItems: 'center',
                position: 'relative', overflow: 'hidden', paddingTop: 70,
            }}>
                {/* Background decoration */}
                <div style={{
                    position: 'absolute', top: -80, right: -80, width: 500, height: 500,
                    borderRadius: '50%', background: 'radial-gradient(circle,rgba(38,184,160,0.12) 0%,transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', bottom: -120, left: -120, width: 600, height: 600,
                    borderRadius: '50%', background: 'radial-gradient(circle,rgba(38,184,160,0.07) 0%,transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="hero-grid">

                        {/* Left copy */}
                        <div style={{ animation: 'fadeUp 0.7s ease both' }}>
                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                background: 'rgba(38,184,160,0.15)', border: '1px solid rgba(38,184,160,0.3)',
                                borderRadius: 50, padding: '6px 16px', marginBottom: 28,
                            }}>
                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#26b8a0', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />
                                <span style={{ fontSize: 12, color: '#9de4d8', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', fontFamily: "'Poppins', sans-serif" }}>
                                    600+ Professionals Ready
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: 'clamp(34px, 5vw, 58px)',
                                fontWeight: 800, color: 'white', lineHeight: 1.15,
                                marginBottom: 24, fontFamily: "'Poppins', sans-serif",
                            }}>
                                You Are Not Alone.<br />
                                <span style={{ color: '#26b8a0' }}>Support Is Here.</span>
                            </h1>

                            <p style={{
                                fontSize: 18, color: 'rgba(255,255,255,0.72)',
                                lineHeight: 1.75, marginBottom: 36, maxWidth: 480,
                                fontFamily: "'Poppins', sans-serif",
                            }}>
                                Connect with trusted doctors, counsellors, and mental health professionals — privately, securely, and on your terms.
                            </p>

                            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
                                <button className="btn btn-primary btn-lg" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Find a Doctor
                                </button>
                                <button className="btn btn-outline-white btn-lg" onClick={() => navigate('community')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Join Community
                                </button>
                            </div>

                            {/* Trust indicators */}
                            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                                {['End-to-end encrypted', 'HIPAA compliant', 'Available 24 / 7'].map(t => (
                                    <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ color: '#26b8a0', fontSize: 14 }}>✓</span>
                                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontFamily: "'Poppins', sans-serif" }}>{t}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right card cluster */}
                        <div style={{ position: 'relative', animation: 'fadeUp 0.7s 0.2s ease both' }} className="hero-cards">
                            {/* Main card */}
                            <div style={{
                                background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 24, padding: 28,
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                                    <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg,#26b8a0,#34d4ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>👩‍⚕️</div>
                                    <div>
                                        <p style={{ fontWeight: 700, color: 'white', fontSize: 16, fontFamily: "'Poppins', sans-serif" }}>Dr. Amara Nwosu</p>
                                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>Mental Health Specialist</p>
                                    </div>
                                    <span className="status-badge status-available" style={{ marginLeft: 'auto' }}>
                                        <span className="status-dot" />Available
                                    </span>
                                </div>
                                <div style={{
                                    background: 'rgba(38,184,160,0.1)', borderRadius: 14,
                                    padding: '14px 18px', marginBottom: 18,
                                }}>
                                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                                        "Every step you take toward healing is a step worth celebrating."
                                    </p>
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('doctors')}>
                                        Book Session
                                    </button>
                                    <button onClick={() => navigate('chat')} style={{
                                        width: 38, height: 38, borderRadius: 10,
                                        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)',
                                        color: 'white', fontSize: 18, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>💬</button>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <div style={{
                                position: 'absolute', top: -20, right: -20,
                                background: 'white', borderRadius: 14, padding: '10px 16px',
                                boxShadow: '0 8px 28px rgba(11,31,58,0.2)',
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                                <span style={{ fontSize: 20 }}>⭐</span>
                                <div>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>4.9 / 5.0</p>
                                    <p style={{ fontSize: 11, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>312 reviews</p>
                                </div>
                            </div>

                            <div style={{
                                position: 'absolute', bottom: -18, left: -18,
                                background: 'white', borderRadius: 14, padding: '10px 16px',
                                boxShadow: '0 8px 28px rgba(11,31,58,0.2)',
                                display: 'flex', alignItems: 'center', gap: 8,
                            }}>
                                <span style={{ fontSize: 20 }}>🕐</span>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Today 3:00 PM</p>
                                    <p style={{ fontSize: 11, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>Next available slot</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
          @media (max-width: 768px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
            .hero-cards { display: none; }
          }
        `}</style>
            </section>

            {/* ── STATS ── */}
            <section ref={statsRef} style={{
                background: 'linear-gradient(135deg,#0b1f3a,#1e3f6e)',
                padding: '64px 0',
            }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="stats-grid">
                        {stats.map(s => <StatCard key={s.label} stat={s} started={statsStarted} />)}
                    </div>
                </div>
                <style>{`
          @media (max-width: 768px) { .stats-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
        `}</style>
            </section>

            {/* ── CATEGORIES ── */}
            <section className="section" style={{ background: '#f5fbfa' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="label-chip">Specialities</span>
                    <h2 className="section-title" style={{ marginBottom: 8 }}>Find Care for Every Need</h2>
                    <p className="section-sub" style={{ margin: '0 auto 48px', textAlign: 'center' }}>
                        Our platform covers the full spectrum of mental and physical health — with specialists matched to your unique situation.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 16 }} className="cat-grid">
                        {categories.map(c => (
                            <button
                                key={c.label}
                                onClick={() => navigate('doctors')}
                                style={{
                                    background: 'white', border: '1.5px solid #cce8e3',
                                    borderRadius: 16, padding: '24px 12px',
                                    cursor: 'pointer', transition: 'all 0.22s',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = c.color; e.currentTarget.style.borderColor = '#26b8a0'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(38,184,160,0.15)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#cce8e3'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <span style={{ fontSize: 32 }}>{c.icon}</span>
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{c.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <style>{`
          @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(3,1fr) !important; } }
          @media (max-width: 480px) { .cat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        `}</style>
            </section>

            {/* ── HOW IT WORKS ── */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hiw-grid">
                        <div>
                            <span className="label-chip">How It Works</span>
                            <h2 className="section-title">Getting support has never been simpler</h2>
                            <p className="section-sub" style={{ marginBottom: 48 }}>
                                From your first click to your first breakthrough — SanaMind is designed to feel effortless, warm, and safe at every step.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                                {howItWorks.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start', animation: `fadeUp 0.5s ${i * 0.1}s ease both` }}>
                                        <div style={{
                                            width: 48, height: 48, borderRadius: 14,
                                            background: i % 2 === 0 ? '#e6f8f5' : '#0b1f3a',
                                            color: i % 2 === 0 ? '#26b8a0' : 'white',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 13, fontWeight: 800, flexShrink: 0,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}>{item.step}</div>
                                        <div>
                                            <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>{item.title}</h4>
                                            <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.65, fontFamily: "'Poppins', sans-serif" }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-primary" style={{ marginTop: 36, fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('signup')}>
                                Start Your Journey
                            </button>
                        </div>

                        {/* Visual panel */}
                        <div style={{
                            background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)',
                            borderRadius: 28, padding: 36, position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(38,184,160,0.1)' }} />
                            <div style={{ marginBottom: 28 }}>
                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Today's Session</p>
                                <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, marginBottom: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#26b8a0,#34d4ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>👩‍⚕️</div>
                                        <div>
                                            <p style={{ fontWeight: 600, color: 'white', fontSize: 14, fontFamily: "'Poppins', sans-serif" }}>Dr. Riya Sharma</p>
                                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, fontFamily: "'Poppins', sans-serif" }}>Child & Teen Psychology</p>
                                        </div>
                                        <span className="status-badge status-available" style={{ marginLeft: 'auto', fontSize: 10 }}><span className="status-dot" />Live</span>
                                    </div>
                                </div>
                                {[
                                    { label: 'Duration', val: '50 min' },
                                    { label: 'Platform', val: 'Secure Video' },
                                    { label: 'Next Session', val: 'Thu, 4:00 PM' },
                                ].map(r => (
                                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>{r.label}</span>
                                        <span style={{ fontSize: 13, color: 'white', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>{r.val}</span>
                                    </div>
                                ))}
                            </div>
                            <div style={{ background: 'rgba(38,184,160,0.12)', borderRadius: 12, padding: '14px 18px', border: '1px solid rgba(38,184,160,0.2)' }}>
                                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                                    "Progress, not perfection. Every session is a step forward."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`@media (max-width: 768px) { .hiw-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            {/* ── WELLNESS TIPS PREVIEW ── */}
            <section className="section" style={{ background: '#f5fbfa' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <span className="label-chip">Daily Wellness</span>
                        <h2 className="section-title">Small steps. Lasting change.</h2>
                        <p className="section-sub" style={{ margin: '0 auto' }}>
                            Daily habits that take under five minutes — backed by health professionals and delivered with care.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="tips-grid">
                        {wellnessTips.map((tip, i) => (
                            <div key={tip.id} className="card" style={{ padding: 28, animation: `fadeUp 0.5s ${i * 0.1}s ease both` }}>
                                <div style={{ fontSize: 36, marginBottom: 16 }}>{tip.icon}</div>
                                <span style={{
                                    display: 'inline-block', background: tip.color,
                                    color: '#0b1f3a', fontSize: 10, fontWeight: 700,
                                    letterSpacing: 1, textTransform: 'uppercase',
                                    padding: '3px 10px', borderRadius: 50, marginBottom: 10,
                                    fontFamily: "'Poppins', sans-serif",
                                }}>{tip.category}</span>
                                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>{tip.title}</h4>
                                <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, fontFamily: "'Poppins', sans-serif" }}>{tip.tip}</p>
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 36 }}>
                        <button className="btn btn-navy" onClick={() => navigate('wellness')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Explore Full Wellness Hub
                        </button>
                    </div>
                </div>
                <style>{`
          @media (max-width: 900px) { .tips-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 480px) { .tips-grid { grid-template-columns: 1fr !important; } }
        `}</style>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <span className="label-chip">Patient Stories</span>
                        <h2 className="section-title">Healing, in their own words</h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="test-grid">
                        {testimonials.map((t, i) => (
                            <div key={t.id} className="card" style={{ padding: 32, animation: `fadeUp 0.5s ${i * 0.15}s ease both` }}>
                                <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                                    {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#f5a623', fontSize: 16 }}>★</span>)}
                                </div>
                                <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.75, marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>
                                    "{t.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '50%',
                                        background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 700, fontSize: 15,
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>{t.initials}</div>
                                    <div>
                                        <p style={{ fontWeight: 700, color: '#0b1f3a', fontSize: 14, fontFamily: "'Poppins', sans-serif" }}>{t.name}</p>
                                        <p style={{ color: '#7a96b4', fontSize: 12, fontFamily: "'Poppins', sans-serif" }}>{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`
          @media (max-width: 900px) { .test-grid { grid-template-columns: 1fr !important; } }
        `}</style>
            </section>

            {/* ── FAQ ── */}
            <section className="section" style={{ background: '#f5fbfa' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="faq-grid">
                        <div>
                            <span className="label-chip">FAQ</span>
                            <h2 className="section-title">Common questions answered</h2>
                            <p className="section-sub" style={{ marginBottom: 32 }}>
                                We believe in full transparency. Here is everything you need to know before your first session.
                            </p>
                            <button className="btn btn-primary" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Browse Doctors
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
                        </div>
                    </div>
                </div>
                <style>{`@media (max-width: 768px) { .faq-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            {/* ── CTA ── */}
            <section style={{
                background: 'linear-gradient(135deg,#26b8a0 0%,#0b1f3a 100%)',
                padding: '96px 0', textAlign: 'center',
            }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>
                        Your wellness journey starts today.
                    </h2>
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', marginBottom: 40, fontFamily: "'Poppins', sans-serif" }}>
                        Join 12,000+ people who chose to prioritise themselves.
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-white btn-lg" onClick={() => navigate('signup')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Create Free Account
                        </button>
                        <button className="btn btn-outline-white btn-lg" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Find a Doctor
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
