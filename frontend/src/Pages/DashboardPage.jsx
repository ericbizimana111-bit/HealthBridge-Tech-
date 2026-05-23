import  { useState } from 'react';
import { doctors } from '../data/mockData';

export default function DashboardPage({ navigate, user, onLogout }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        name: user?.name || 'Alex Johnson',
        email: user?.email || 'alex@example.com',
        location: 'Kigali, Rwanda',
        phone: '+250 789 000 000',
        bio: 'Focusing on mental wellness and building healthier daily habits.',
    });
    const [saved, setSaved] = useState(false);

    const appointments = [
        { id: 1, doctor: doctors[0], date: 'Tomorrow', time: '3:00 PM', type: 'Video Call', status: 'upcoming' },
        { id: 2, doctor: doctors[2], date: 'Thu, May 29', time: '11:00 AM', type: 'Video Call', status: 'upcoming' },
        { id: 3, doctor: doctors[1], date: 'May 14', time: '2:30 PM', type: 'Chat', status: 'completed' },
    ];

    const favDoctors = doctors.slice(0, 3);

    const handleSave = () => { setSaved(true); setEditMode(false); setTimeout(() => setSaved(false), 2500); };

    const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'appointments', label: 'Appointments' },
        { key: 'favorites', label: 'Saved Doctors' },
        { key: 'profile', label: 'Edit Profile' },
    ];

    return (
        <div style={{ paddingTop: 70, minHeight: '100vh', background: '#f5fbfa', fontFamily: "'Poppins', sans-serif" }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '48px 0 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
                        <div style={{
                            width: 72, height: 72, borderRadius: '50%',
                            background: 'linear-gradient(135deg,#26b8a0,#34d4ba)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 800, fontSize: 26,
                            border: '3px solid rgba(255,255,255,0.2)',
                            fontFamily: "'Poppins', sans-serif",
                        }}>{user?.initials || 'AJ'}</div>
                        <div>
                            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>
                                Good day, {profile.name.split(' ')[0]} 👋
                            </h1>
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: "'Poppins', sans-serif" }}>
                                {profile.email} · {profile.location}
                            </p>
                        </div>
                        <button className="btn btn-outline-white btn-sm" style={{ marginLeft: 'auto', fontFamily: "'Poppins', sans-serif" }} onClick={onLogout}>
                            Log Out
                        </button>
                    </div>

                    <div style={{ display: 'flex', gap: 0 }}>
                        {tabs.map(t => (
                            <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
                                padding: '12px 22px', background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 13, fontWeight: activeTab === t.key ? 700 : 500,
                                color: activeTab === t.key ? 'white' : 'rgba(255,255,255,0.5)',
                                borderBottom: `2px solid ${activeTab === t.key ? '#26b8a0' : 'transparent'}`,
                                transition: 'all 0.2s', fontFamily: "'Poppins', sans-serif",
                            }}>{t.label}</button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '36px 24px' }}>

                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                    <div>
                        {/* Quick stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 36 }} className="dash-stats">
                            {[
                                { label: 'Sessions Completed', val: '8', icon: '✅', color: '#e6f8f5' },
                                { label: 'Upcoming Sessions', val: '2', icon: '📅', color: '#e8eeff' },
                                { label: 'Saved Doctors', val: '3', icon: '❤️', color: '#fde8f0' },
                                { label: 'Wellness Streak', val: '5 days', icon: '🔥', color: '#fff5e6' },
                            ].map(s => (
                                <div key={s.label} style={{ background: 'white', borderRadius: 16, padding: '20px 18px', border: '1px solid #cce8e3', display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                                    <div>
                                        <p style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', lineHeight: 1, fontFamily: "'Poppins', sans-serif" }}>{s.val}</p>
                                        <p style={{ fontSize: 12, color: '#7a96b4', marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="dash-grid">
                            {/* Upcoming */}
                            <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #cce8e3' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 18, fontFamily: "'Poppins', sans-serif" }}>Next Sessions</h3>
                                {appointments.filter(a => a.status === 'upcoming').map(appt => (
                                    <div key={appt.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f7f6' }}>
                                        <div style={{ width: 44, height: 44, borderRadius: '50%', background: `linear-gradient(135deg,${appt.doctor.color},${appt.doctor.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>{appt.doctor.initials}</div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{appt.doctor.name}</p>
                                            <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{appt.date} · {appt.time} · {appt.type}</p>
                                        </div>
                                        <button className="btn btn-ghost btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('chat')}>Join</button>
                                    </div>
                                ))}
                                <button className="btn btn-navy btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 16, fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('doctors')}>
                                    Book New Session
                                </button>
                            </div>

                            {/* Wellness snapshot */}
                            <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #cce8e3' }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 18, fontFamily: "'Poppins', sans-serif" }}>Wellness Snapshot</h3>
                                {[
                                    { label: 'Mood this week', pct: 72, color: '#26b8a0' },
                                    { label: 'Habits completed', pct: 58, color: '#0b1f3a' },
                                    { label: 'Session attendance', pct: 100, color: '#26b8a0' },
                                ].map(item => (
                                    <div key={item.label} style={{ marginBottom: 16 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                                            <span style={{ fontSize: 13, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>{item.label}</span>
                                            <span style={{ fontSize: 13, fontWeight: 700, color: item.color, fontFamily: "'Poppins', sans-serif" }}>{item.pct}%</span>
                                        </div>
                                        <div style={{ height: 7, background: '#e8f5f2', borderRadius: 4 }}>
                                            <div style={{ height: '100%', width: `${item.pct}%`, background: item.color, borderRadius: 4 }} />
                                        </div>
                                    </div>
                                ))}
                                <button className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('wellness')}>
                                    Open Wellness Hub
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── APPOINTMENTS ── */}
                {activeTab === 'appointments' && (
                    <div style={{ maxWidth: 700 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>Your Appointments</h2>
                        {appointments.map(appt => (
                            <div key={appt.id} style={{
                                background: 'white', borderRadius: 16, padding: '20px 24px',
                                border: `1px solid ${appt.status === 'upcoming' ? '#cce8e3' : '#e8e8e8'}`,
                                marginBottom: 14, display: 'flex', alignItems: 'center', gap: 16,
                            }}>
                                <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg,${appt.doctor.color},${appt.doctor.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 16, flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>{appt.doctor.initials}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{appt.doctor.name}</p>
                                    <p style={{ fontSize: 13, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{appt.doctor.specialty}</p>
                                    <p style={{ fontSize: 12, color: '#7a96b4', marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{appt.date} at {appt.time} · {appt.type}</p>
                                </div>
                                <span style={{
                                    padding: '5px 14px', borderRadius: 50, fontSize: 12, fontWeight: 600,
                                    background: appt.status === 'upcoming' ? '#e6f8f5' : '#f0f0f0',
                                    color: appt.status === 'upcoming' ? '#26b8a0' : '#999',
                                    fontFamily: "'Poppins', sans-serif",
                                }}>{appt.status === 'upcoming' ? 'Upcoming' : 'Completed'}</span>
                                {appt.status === 'upcoming' && (
                                    <button className="btn btn-primary btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('chat')}>Join</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* ── SAVED DOCTORS ── */}
                {activeTab === 'favorites' && (
                    <div>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>Saved Doctors</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="fav-grid">
                            {favDoctors.map(doc => (
                                <div key={doc.id} style={{ background: 'white', borderRadius: 18, padding: 24, border: '1px solid #cce8e3' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                                        <div style={{ width: 52, height: 52, borderRadius: '50%', background: `linear-gradient(135deg,${doc.color},${doc.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 18, fontFamily: "'Poppins', sans-serif" }}>{doc.initials}</div>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{doc.name}</p>
                                            <p style={{ fontSize: 12, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{doc.specialty}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('doctor-profile', doc)}>View</button>
                                        <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => navigate('chat')}>Chat</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── PROFILE ── */}
                {activeTab === 'profile' && (
                    <div style={{ maxWidth: 600 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Edit Profile</h2>
                            {saved && <span style={{ background: '#e6f8f5', color: '#26b8a0', fontSize: 13, fontWeight: 600, padding: '5px 14px', borderRadius: 50, fontFamily: "'Poppins', sans-serif" }}>✓ Saved!</span>}
                        </div>
                        <div style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #cce8e3' }}>
                            <div style={{ textAlign: 'center', marginBottom: 28 }}>
                                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#26b8a0,#34d4ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 28, margin: '0 auto 10px', fontFamily: "'Poppins', sans-serif" }}>{user?.initials || 'AJ'}</div>
                                <button style={{ background: 'none', border: 'none', color: '#26b8a0', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>Change photo</button>
                            </div>
                            {[
                                { key: 'name', label: 'Full Name' },
                                { key: 'email', label: 'Email', type: 'email' },
                                { key: 'phone', label: 'Phone Number' },
                                { key: 'location', label: 'Location' },
                            ].map(f => (
                                <div key={f.key} style={{ marginBottom: 16 }}>
                                    <label className="form-label">{f.label}</label>
                                    <input className="form-input" type={f.type || 'text'} value={profile[f.key]} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))} style={{ fontFamily: "'Poppins', sans-serif" }} />
                                </div>
                            ))}
                            <div style={{ marginBottom: 24 }}>
                                <label className="form-label">About Me</label>
                                <textarea className="form-input" rows={3} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} style={{ resize: 'vertical', fontFamily: "'Poppins', sans-serif" }} />
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={handleSave}>
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 900px) {
          .dash-stats { grid-template-columns: 1fr 1fr !important; }
          .dash-grid { grid-template-columns: 1fr !important; }
          .fav-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .dash-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
