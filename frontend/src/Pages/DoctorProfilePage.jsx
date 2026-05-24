
import React, { useState } from 'react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';
import StarRating from '../components/ui/StarRating';
import Modal from '../components/ui/Modal';

const STATUS_VARIANT = { available: 'available', busy: 'busy', 'in-session': 'session', offline: 'offline' };
const STATUS_LABEL = { available: 'Available Now', busy: 'Busy', 'in-session': 'In Session', offline: 'Offline' };

const SLOTS = ['Today 3:00 PM', 'Today 5:00 PM', 'Tomorrow 9:00 AM', 'Tomorrow 11:30 AM', 'Wed 2:00 PM', 'Thu 4:00 PM', 'Fri 10:00 AM', 'Fri 3:30 PM'];

export default function DoctorProfilePage({ doctor, navigate }) {
    const [tab, setTab] = useState('about');
    const [bookingOpen, setBook] = useState(false);
    const [selectedSlot, setSlot] = useState(null);
    const [booked, setBooked] = useState(false);

    if (!doctor) {
        return (
            <div style={{ paddingTop: 140, textAlign: 'center', fontFamily: "'Poppins',sans-serif" }}>
                <p style={{ fontSize: 48 }}>👩‍⚕️</p>
                <h2 style={{ fontSize: 22, color: '#0b1f3a', marginTop: 16, marginBottom: 20, fontFamily: "'Poppins',sans-serif" }}>No doctor selected</h2>
                <button className="btn btn-primary" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins',sans-serif" }}>Browse Doctors</button>
            </div>
        );
    }

    const TABS = ['about', 'testimonials', 'articles'];

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins',sans-serif" }}>

            {/* ── Profile hero ── */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '56px 0 0' }}>
                <div className="container">
                    <button onClick={() => navigate('doctors')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28, fontFamily: "'Poppins',sans-serif" }}>
                        ← Back to Doctors
                    </button>
                    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap', paddingBottom: 36 }}>
                        <Avatar initials={doctor.initials} size={110} color={doctor.color} status={doctor.status} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 6 }}>
                                <h1 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: 'white', fontFamily: "'Poppins',sans-serif" }}>{doctor.name}</h1>
                                <Badge variant={STATUS_VARIANT[doctor.status]} dot>{STATUS_LABEL[doctor.status]}</Badge>
                            </div>
                            <p style={{ fontSize: 16, color: '#9de4d8', fontWeight: 600, marginBottom: 12, fontFamily: "'Poppins',sans-serif" }}>{doctor.specialty}</p>
                            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
                                {[{ icon: '📍', val: doctor.location }, { icon: '⏱', val: doctor.experience }, { icon: '🌐', val: doctor.languages.join(', ') }].map(item => (
                                    <span key={item.val} style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', gap: 5, fontFamily: "'Poppins',sans-serif" }}>{item.icon} {item.val}</span>
                                ))}
                            </div>
                            <StarRating value={doctor.rating} showValue total={doctor.reviews} size={15} />
                        </div>
                        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignSelf: 'center' }}>
                            <button className="btn btn-primary" onClick={() => setBook(true)} style={{ fontFamily: "'Poppins',sans-serif" }}>Book Session</button>
                            <button className="btn btn-outline-white" onClick={() => navigate('chat')} style={{ fontFamily: "'Poppins',sans-serif" }}>Message</button>
                            <button className="btn btn-outline-white" onClick={() => navigate('video-call', doctor)} style={{ fontFamily: "'Poppins',sans-serif" }}>Video Call</button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        {TABS.map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                padding: '13px 24px', background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 14, fontWeight: tab === t ? 700 : 500, textTransform: 'capitalize',
                                color: tab === t ? 'white' : 'rgba(255,255,255,0.5)',
                                borderBottom: `2px solid ${tab === t ? '#26b8a0' : 'transparent'}`,
                                transition: 'all 0.2s', fontFamily: "'Poppins',sans-serif",
                            }}>{t}</button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Tab content ── */}
            <div className="container" style={{ padding: '40px 24px', maxWidth: 960 }}>

                {/* About */}
                {tab === 'about' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 40 }} className="profile-grid">
                        <div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins',sans-serif" }}>About</h3>
                            <p style={{ fontSize: 15, color: '#2c4a5e', lineHeight: 1.8, marginBottom: 28, fontFamily: "'Poppins',sans-serif" }}>{doctor.bio}</p>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins',sans-serif" }}>Areas of Focus</h3>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
                                {doctor.tags.map(t => <Badge key={t} variant="teal">{t}</Badge>)}
                            </div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins',sans-serif" }}>Languages</h3>
                            <div style={{ display: 'flex', gap: 8 }}>
                                {doctor.languages.map(l => <Badge key={l} variant="navy">{l}</Badge>)}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            <div className="card" style={{ padding: 24 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 16, fontFamily: "'Poppins',sans-serif" }}>Session Details</h4>
                                {[
                                    { label: 'Consultation Fee', val: doctor.consultFee },
                                    { label: 'Next Available', val: doctor.nextSlot },
                                    { label: 'Session Length', val: '50 minutes' },
                                    { label: 'Platform', val: 'Video / Chat' },
                                ].map(item => (
                                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', borderBottom: '1px solid #f0f7f6' }}>
                                        <span style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins',sans-serif" }}>{item.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins',sans-serif" }}>{item.val}</span>
                                    </div>
                                ))}
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: 18, fontFamily: "'Poppins',sans-serif" }} onClick={() => setBook(true)}>
                                    Book a Session
                                </button>
                            </div>

                            <div className="card" style={{ padding: 24 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 14, fontFamily: "'Poppins',sans-serif" }}>Patient Satisfaction</h4>
                                {[['Overall Rating', 98], ['Communication', 99], ['Expertise', 97], ['Empathy', 100]].map(([label, pct]) => (
                                    <div key={label} style={{ marginBottom: 13 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                            <span style={{ fontSize: 12, color: '#2c4a5e', fontFamily: "'Poppins',sans-serif" }}>{label}</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: '#26b8a0', fontFamily: "'Poppins',sans-serif" }}>{pct}%</span>
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

                {/* Testimonials */}
                {tab === 'testimonials' && (
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 24, fontFamily: "'Poppins',sans-serif" }}>
                            Patient Testimonials ({doctor.testimonials.length})
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {doctor.testimonials.map((t, i) => (
                                <div key={i} className="card" style={{ padding: 28 }}>
                                    <StarRating value={t.rating} size={16} />
                                    <p style={{ fontSize: 15, color: '#2c4a5e', lineHeight: 1.78, margin: '14px 0 16px', fontFamily: "'Poppins',sans-serif" }}>"{t.text}"</p>
                                    <p style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins',sans-serif" }}>— {t.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Articles */}
                {tab === 'articles' && (
                    <div>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 24, fontFamily: "'Poppins',sans-serif" }}>Wellness Articles</h3>
                        {[
                            { title: 'Five Grounding Techniques for Overwhelming Moments', date: 'May 15, 2026', read: '4 min read' },
                            { title: 'Understanding the Difference Between Stress and Anxiety', date: 'May 8, 2026', read: '6 min read' },
                            { title: 'How Sleep Affects Your Emotional Regulation', date: 'Apr 29, 2026', read: '5 min read' },
                        ].map((a, i) => (
                            <div key={i} className="card" style={{ padding: '20px 24px', marginBottom: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                                <div>
                                    <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 4, fontFamily: "'Poppins',sans-serif" }}>{a.title}</h4>
                                    <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins',sans-serif" }}>{a.date} · {a.read}</p>
                                </div>
                                <button className="btn btn-ghost btn-sm" style={{ fontFamily: "'Poppins',sans-serif" }}>Read</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Booking modal ── */}
            <Modal open={bookingOpen} onClose={() => { setBook(false); setBooked(false); setSlot(null); }} title={booked ? undefined : 'Choose a Time Slot'} maxWidth={500}>
                {booked ? (
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins',sans-serif" }}>Session Confirmed!</h3>
                        <p style={{ color: '#2c4a5e', marginBottom: 6, fontFamily: "'Poppins',sans-serif" }}>Booked with <strong>{doctor.name}</strong></p>
                        <p style={{ color: '#26b8a0', fontWeight: 700, fontSize: 16, marginBottom: 20, fontFamily: "'Poppins',sans-serif" }}>{selectedSlot}</p>
                        <p style={{ fontSize: 13, color: '#7a96b4', marginBottom: 28, lineHeight: 1.65, fontFamily: "'Poppins',sans-serif" }}>
                            A confirmation and secure video link will be sent to your email 30 minutes before your session.
                        </p>
                        <button className="btn btn-primary" style={{ width: '100%', fontFamily: "'Poppins',sans-serif" }} onClick={() => { setBook(false); setBooked(false); setSlot(null); }}>Done</button>
                    </div>
                ) : (
                    <>
                        <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 20, fontFamily: "'Poppins',sans-serif" }}>
                            Booking with <strong style={{ color: '#0b1f3a', fontFamily: "'Poppins',sans-serif" }}>{doctor.name}</strong> · {doctor.consultFee} / session
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
                            {SLOTS.map(slot => (
                                <button key={slot} onClick={() => setSlot(slot)} style={{
                                    padding: '12px 14px', borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                                    border: `2px solid ${selectedSlot === slot ? '#26b8a0' : '#cce8e3'}`,
                                    background: selectedSlot === slot ? '#e6f8f5' : 'white',
                                    color: selectedSlot === slot ? '#26b8a0' : '#2c4a5e',
                                    fontWeight: selectedSlot === slot ? 700 : 400,
                                    fontSize: 13, transition: 'all 0.18s',
                                    fontFamily: "'Poppins',sans-serif",
                                }}>{slot}</button>
                            ))}
                        </div>
                        <button
                            className="btn btn-primary"
                            style={{ width: '100%', opacity: selectedSlot ? 1 : 0.4, fontFamily: "'Poppins',sans-serif" }}
                            disabled={!selectedSlot}
                            onClick={() => setBooked(true)}
                        >Confirm Booking</button>
                    </>
                )}
            </Modal>

            <style>{`@media (max-width: 768px) { .profile-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
    );
}
