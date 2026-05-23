import { useState } from 'react';

const STATUS_MAP = {
    available: { label: 'Available Now', cls: 'status-available' },
    busy: { label: 'Busy', cls: 'status-busy' },
    'in-session': { label: 'In Session', cls: 'status-session' },
    offline: { label: 'Offline', cls: 'status-offline' },
};

export default function DoctorProfilePage({ doctor, navigate }) {
    const [tab, setTab] = useState('about');
    const [bookingOpen, setBookingOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [booked, setBooked] = useState(false);

    if (!doctor) {
        return (
            <div style={{ paddingTop: 130, textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>
                <p style={{ fontSize: 48 }}>👩‍⚕️</p>
                <h2 style={{ fontFamily: "'Poppins', sans-serif", color: '#0b1f3a' }}>No doctor selected</h2>
                <button className="btn btn-primary" style={{ marginTop: 20, fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('doctors')}>
                    Browse Doctors
                </button>
            </div>
        );
    }

    const st = STATUS_MAP[doctor.status] || STATUS_MAP.offline;

    const slots = [
        'Today 3:00 PM', 'Today 5:00 PM', 'Tomorrow 9:00 AM',
        'Tomorrow 11:30 AM', 'Wed 2:00 PM', 'Thu 4:00 PM',
    ];

    const tabs = ['about', 'testimonials', 'articles'];

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>
            {/* Hero band */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '56px 0 0' }}>
                <div className="container">
                    <button
                        onClick={() => navigate('doctors')}
                        style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.65)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}
                    >
                        ← Back to Doctors
                    </button>

                    <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap', paddingBottom: 40 }}>
                        {/* Avatar */}
                        <div style={{
                            width: 110, height: 110, borderRadius: '50%', flexShrink: 0,
                            background: `linear-gradient(135deg,${doctor.color},${doctor.color}88)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 800, fontSize: 36,
                            border: '4px solid rgba(255,255,255,0.2)',
                            fontFamily: "'Poppins', sans-serif",
                        }}>{doctor.initials}</div>

                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
                                <h1 style={{ fontSize: 28, fontWeight: 800, color: 'white', fontFamily: "'Poppins', sans-serif" }}>{doctor.name}</h1>
                                <span className={`status-badge ${st.cls}`}><span className="status-dot" />{st.label}</span>
                            </div>
                            <p style={{ fontSize: 16, color: '#9de4d8', fontWeight: 600, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{doctor.specialty}</p>
                            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                                {[
                                    { icon: '📍', val: doctor.location },
                                    { icon: '⏱️', val: doctor.experience },
                                    { icon: '🌐', val: doctor.languages.join(', ') },
                                ].map(item => (
                                    <span key={item.val} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Poppins', sans-serif" }}>
                                        {item.icon} {item.val}
                                    </span>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                                <span style={{ color: '#f5a623' }}>{'★'.repeat(Math.floor(doctor.rating))}</span>
                                <span style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif" }}>{doctor.rating}</span>
                                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: "'Poppins', sans-serif" }}>({doctor.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignSelf: 'center' }}>
                            <button className="btn btn-primary" style={{ fontFamily: "'Poppins', sans-serif" }} onClick={() => setBookingOpen(true)}>
                                Book Session
                            </button>
                            <button className="btn btn-outline-white" style={{ fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('chat')}>
                                Send Message
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                        {tabs.map(t => (
                            <button
                                key={t}
                                onClick={() => setTab(t)}
                                style={{
                                    padding: '14px 24px',
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    fontSize: 14, fontWeight: tab === t ? 700 : 500,
                                    color: tab === t ? 'white' : 'rgba(255,255,255,0.5)',
                                    borderBottom: tab === t ? '2px solid #26b8a0' : '2px solid transparent',
                                    transition: 'all 0.2s', textTransform: 'capitalize',
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab content */}
            <div className="container" style={{ padding: '40px 24px', maxWidth: 900 }}>

                {tab === 'about' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }} className="profile-grid">
                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>About</h3>
                            <p style={{ fontSize: 15, color: '#2c4a5e', lineHeight: 1.8, marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>{doctor.bio}</p>

                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>Specialisations</h3>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                                {doctor.tags.map(tag => (
                                    <span key={tag} style={{
                                        background: '#e6f8f5', color: '#0a7060', fontSize: 13, fontWeight: 600,
                                        padding: '6px 16px', borderRadius: 50, fontFamily: "'Poppins', sans-serif",
                                    }}>{tag}</span>
                                ))}
                            </div>

                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>Languages</h3>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {doctor.languages.map(lang => (
                                    <span key={lang} style={{ background: '#f0f7f6', color: '#0b1f3a', fontSize: 13, fontWeight: 600, padding: '6px 16px', borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>{lang}</span>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div>
                            <div className="card" style={{ padding: 24, marginBottom: 20 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>Session Info</h4>
                                {[
                                    { label: 'Consultation Fee', val: doctor.consultFee },
                                    { label: 'Next Available', val: doctor.nextSlot },
                                    { label: 'Session Length', val: '50 minutes' },
                                    { label: 'Platform', val: 'Video / Chat' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f7f6' }}>
                                        <span style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{item.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{item.val}</span>
                                    </div>
                                ))}
                                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 18, fontFamily: "'Poppins', sans-serif" }} onClick={() => setBookingOpen(true)}>
                                    Book a Session
                                </button>
                            </div>

                            <div className="card" style={{ padding: 24 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Patient Satisfaction</h4>
                                {[['Overall Rating', 98], ['Communication', 99], ['Expertise', 97], ['Empathy', 100]].map(([label, pct]) => (
                                    <div key={label} style={{ marginBottom: 12 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 12, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>{label}</span>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{pct}%</span>
                                        </div>
                                        <div style={{ height: 6, background: '#e8f5f2', borderRadius: 3 }}>
                                            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#26b8a0,#34d4ba)', borderRadius: 3 }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'testimonials' && (
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>
                            Patient Testimonials ({doctor.testimonials.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {doctor.testimonials.map((t, i) => (
                                <div key={i} className="card" style={{ padding: 28 }}>
                                    <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
                                        {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: '#f5a623', fontSize: 16 }}>★</span>)}
                                    </div>
                                    <p style={{ fontSize: 15, color: '#2c4a5e', lineHeight: 1.75, marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>"{t.text}"</p>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>— {t.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {tab === 'articles' && (
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>Wellness Articles</h3>
                        {[
                            { title: 'Five Grounding Techniques for Overwhelming Moments', date: 'May 15, 2026', read: '4 min read' },
                            { title: 'Understanding the Difference Between Stress and Anxiety', date: 'May 8, 2026', read: '6 min read' },
                            { title: 'How Sleep Affects Your Emotional Regulation', date: 'Apr 29, 2026', read: '5 min read' },
                        ].map((a, i) => (
                            <div key={i} className="card" style={{ padding: 24, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                <div>
                                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>{a.title}</h4>
                                    <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{a.date} · {a.read}</p>
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Read Article</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Booking modal */}
            {bookingOpen && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(11,31,58,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000, padding: 24, backdropFilter: 'blur(4px)',
                }} onClick={e => { if (e.target === e.currentTarget) setBookingOpen(false); }}>
                    <div style={{
                        background: 'white', borderRadius: 24, padding: 36,
                        width: '100%', maxWidth: 480,
                        animation: 'fadeUp 0.3s ease both',
                    }}>
                        {booked ? (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>Session Booked!</h3>
                                <p style={{ color: '#2c4a5e', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Your session with <strong style={{ fontFamily: "'Poppins', sans-serif" }}>{doctor.name}</strong> is confirmed.</p>
                                <p style={{ color: '#26b8a0', fontWeight: 600, fontSize: 16, marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>{selectedSlot}</p>
                                <p style={{ fontSize: 13, color: '#7a96b4', marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>
                                    A confirmation email has been sent. You'll receive a secure video link 30 minutes before your session.
                                </p>
                                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => { setBookingOpen(false); setBooked(false); }}>
                                    Done
                                </button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Choose a Time Slot</h3>
                                    <button onClick={() => setBookingOpen(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#7a96b4' }}>✕</button>
                                </div>
                                <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>Booking with <strong style={{ color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{doctor.name}</strong> — {doctor.consultFee} / session</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                                    {slots.map(slot => (
                                        <button key={slot} onClick={() => setSelectedSlot(slot)} style={{
                                            padding: '12px 16px', borderRadius: 12, cursor: 'pointer',
                                            border: `2px solid ${selectedSlot === slot ? '#26b8a0' : '#cce8e3'}`,
                                            background: selectedSlot === slot ? '#e6f8f5' : 'white',
                                            color: selectedSlot === slot ? '#26b8a0' : '#2c4a5e',
                                            fontWeight: selectedSlot === slot ? 700 : 400,
                                            fontSize: 13, transition: 'all 0.18s',
                                            fontFamily: "'Poppins', sans-serif",
                                        }}>{slot}</button>
                                    ))}
                                </div>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', opacity: selectedSlot ? 1 : 0.5, fontFamily: "'Poppins', sans-serif" }}
                                    disabled={!selectedSlot}
                                    onClick={() => setBooked(true)}
                                >
                                    Confirm Booking
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`@media (max-width: 768px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
}
