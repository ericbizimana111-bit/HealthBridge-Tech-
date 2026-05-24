import React, { useState } from 'react';
import Avatar from '../components/ui/Avatar';
import Badge from '../components/ui/Badge';

/* ─────────────────────────────────────────────
   DoctorDashboardPage
   Separate dashboard for doctors to manage:
   - Today's schedule
   - Patient list
   - Collaboration requests
   - Publish wellness articles
   - Set availability
───────────────────────────────────────────── */

const PATIENTS = [
    { id: 1, name: 'Sarah Mitchell', initials: 'SM', color: '#26b8a0', condition: 'Anxiety & Depression', sessions: 8, nextSession: 'Today 3:00 PM', status: 'active' },
    { id: 2, name: 'James Okoye', initials: 'JO', color: '#1e3f6e', condition: 'Trauma Recovery', sessions: 5, nextSession: 'Thu 11:00 AM', status: 'active' },
    { id: 3, name: 'Priya Anand', initials: 'PA', color: '#6070e0', condition: 'Stress & Burnout', sessions: 12, nextSession: 'Fri 2:00 PM', status: 'active' },
    { id: 4, name: 'Carlos Rivera', initials: 'CR', color: '#2ab8a0', condition: 'Family Therapy', sessions: 3, nextSession: 'Next Mon', status: 'new' },
    { id: 5, name: 'Amina Diallo', initials: 'AD', color: '#0b1f3a', condition: 'PTSD Support', sessions: 19, nextSession: 'Completed', status: 'closed' },
];

const SCHEDULE = [
    { time: '09:00 AM', patient: 'Priya Anand', type: 'Video Call', duration: '50 min', status: 'completed' },
    { time: '11:00 AM', patient: 'Break', type: '', duration: '1 hr', status: 'break' },
    { time: '12:00 PM', patient: 'James Okoye', type: 'Chat', duration: '30 min', status: 'completed' },
    { time: '03:00 PM', patient: 'Sarah Mitchell', type: 'Video Call', duration: '50 min', status: 'upcoming' },
    { time: '04:30 PM', patient: 'New Patient', type: 'Intro Call', duration: '15 min', status: 'upcoming' },
];

const COLLAB = [
    { from: 'Dr. Kwame Osei', specialty: 'Trauma & PTSD', msg: 'Requesting co-consultation on a complex trauma case. Availability this week?', initials: 'KO', color: '#0b1f3a' },
    { from: 'Dr. Elena Petrova', specialty: 'Nutrition & Wellness', msg: 'Would love to co-author a wellness article on sleep and mental health.', initials: 'EP', color: '#1e3f6e' },
];

const TABS = ['overview', 'patients', 'schedule', 'collaborate', 'publish'];

export default function DoctorDashboardPage({ navigate, user, onLogout }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [availability, setAvailability] = useState('available');
    const [article, setArticle] = useState({ title: '', content: '', category: 'Mental Health' });
    const [published, setPublished] = useState(false);
    const [patientSearch, setPatientSearch] = useState('');

    const filteredPatients = PATIENTS.filter(p =>
        p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.condition.toLowerCase().includes(patientSearch.toLowerCase())
    );

    const AVAIL_OPTIONS = [
        { key: 'available', label: 'Available', color: '#26b8a0', bg: '#e6f8f5' },
        { key: 'busy', label: 'Busy', color: '#f4a04a', bg: '#fde8d4' },
        { key: 'in-session', label: 'In Session', color: '#6070e0', bg: '#e4e8ff' },
        { key: 'offline', label: 'Offline', color: '#999', bg: '#ebebeb' },
    ];

    const currentAvail = AVAIL_OPTIONS.find(a => a.key === availability);

    return (
        <div style={{ paddingTop: 70, minHeight: '100vh', background: '#f5fbfa', fontFamily: "'Poppins', sans-serif" }}>

            {/* ── Header ── */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '48px 0 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
                        <Avatar initials={user?.initials || 'DR'} size={72} color="#26b8a0" status={availability} />
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif", marginBottom: 2 }}>Doctor Dashboard</p>
                            <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', fontFamily: "'Poppins', sans-serif", marginBottom: 6 }}>
                                {user?.name || 'Dr. Amara Nwosu'}
                            </h1>
                            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontFamily: "'Poppins', sans-serif" }}>
                                Mental Health Specialist · 14 years experience
                            </p>
                        </div>

                        {/* Availability selector */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>Your status</p>
                            <select
                                value={availability}
                                onChange={e => setAvailability(e.target.value)}
                                style={{
                                    padding: '9px 18px', borderRadius: 50,
                                    background: currentAvail.bg, color: currentAvail.color,
                                    border: 'none', fontWeight: 700, fontSize: 13,
                                    cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                {AVAIL_OPTIONS.map(a => (
                                    <option key={a.key} value={a.key} style={{ fontFamily: "'Poppins', sans-serif" }}>{a.label}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            className="btn btn-outline-white btn-sm"
                            onClick={onLogout}
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        >Log Out</button>
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 0, overflowX: 'auto' }}>
                        {TABS.map(t => (
                            <button key={t} onClick={() => setActiveTab(t)} style={{
                                padding: '13px 22px', background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 13, fontWeight: activeTab === t ? 700 : 500, whiteSpace: 'nowrap',
                                color: activeTab === t ? 'white' : 'rgba(255,255,255,0.5)',
                                borderBottom: `2px solid ${activeTab === t ? '#26b8a0' : 'transparent'}`,
                                transition: 'all 0.2s', textTransform: 'capitalize',
                                fontFamily: "'Poppins', sans-serif",
                            }}>
                                {t === 'collaborate' ? 'Collaborate' : t.charAt(0).toUpperCase() + t.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '36px 24px' }}>

                {/* ── OVERVIEW ── */}
                {activeTab === 'overview' && (
                    <div>
                        {/* Stat cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 32 }} className="doc-stats">
                            {[
                                { icon: '👥', label: 'Active Patients', val: '24', color: '#e6f8f5' },
                                { icon: '📅', label: "Today's Sessions", val: '4', color: '#e8eeff' },
                                { icon: '⭐', label: 'Average Rating', val: '4.9', color: '#fff5e6' },
                                { icon: '💬', label: 'Unread Messages', val: '7', color: '#fde8f0' },
                            ].map(s => (
                                <div key={s.label} style={{ background: 'white', borderRadius: 16, padding: '20px 18px', border: '1px solid #cce8e3', display: 'flex', alignItems: 'center', gap: 14 }}>
                                    <div style={{ width: 48, height: 48, borderRadius: 12, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{s.icon}</div>
                                    <div>
                                        <p style={{ fontSize: 24, fontWeight: 800, color: '#0b1f3a', lineHeight: 1, fontFamily: "'Poppins', sans-serif" }}>{s.val}</p>
                                        <p style={{ fontSize: 12, color: '#7a96b4', marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="doc-overview-grid">
                            {/* Today's schedule preview */}
                            <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #cce8e3' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Today's Schedule</h3>
                                    <button onClick={() => setActiveTab('schedule')} style={{ background: 'none', border: 'none', color: '#26b8a0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>View all</button>
                                </div>
                                {SCHEDULE.slice(0, 4).map((s, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f0f7f6' : 'none' }}>
                                        <div style={{ width: 72, flexShrink: 0 }}>
                                            <p style={{ fontSize: 12, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{s.time}</p>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: 13, fontWeight: 600, color: s.status === 'break' ? '#7a96b4' : '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{s.patient}</p>
                                            {s.type && <p style={{ fontSize: 11, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{s.type} · {s.duration}</p>}
                                        </div>
                                        <Badge
                                            variant={s.status === 'upcoming' ? 'teal' : s.status === 'completed' ? 'gray' : 'navy'}
                                            size="sm"
                                        >
                                            {s.status === 'upcoming' ? 'Soon' : s.status === 'completed' ? 'Done' : 'Break'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>

                            {/* Collab requests preview */}
                            <div style={{ background: 'white', borderRadius: 20, padding: 24, border: '1px solid #cce8e3' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Collaboration Requests</h3>
                                    <Badge variant="teal" size="sm">{COLLAB.length} new</Badge>
                                </div>
                                {COLLAB.map((c, i) => (
                                    <div key={i} style={{ padding: '12px 0', borderBottom: i < COLLAB.length - 1 ? '1px solid #f0f7f6' : 'none' }}>
                                        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
                                            <Avatar initials={c.initials} size={36} color={c.color} />
                                            <div>
                                                <p style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{c.from}</p>
                                                <p style={{ fontSize: 11, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{c.specialty}</p>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: 12, color: '#2c4a5e', lineHeight: 1.55, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{c.msg}</p>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="btn btn-primary btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Accept</button>
                                            <button className="btn btn-outline btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Decline</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PATIENTS ── */}
                {activeTab === 'patients' && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>My Patients</h2>
                            <input
                                value={patientSearch}
                                onChange={e => setPatientSearch(e.target.value)}
                                placeholder="Search patients…"
                                style={{
                                    padding: '10px 18px', border: '1.5px solid #cce8e3', borderRadius: 50,
                                    fontSize: 13, color: '#0b1f3a', width: 240,
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {filteredPatients.map(p => (
                                <div key={p.id} style={{
                                    background: 'white', borderRadius: 16, padding: '20px 24px',
                                    border: '1px solid #cce8e3',
                                    display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
                                }}>
                                    <Avatar initials={p.initials} size={52} color={p.color} />
                                    <div style={{ flex: 1, minWidth: 140 }}>
                                        <p style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{p.name}</p>
                                        <p style={{ fontSize: 13, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{p.condition}</p>
                                        <p style={{ fontSize: 12, color: '#7a96b4', marginTop: 2, fontFamily: "'Poppins', sans-serif" }}>{p.sessions} sessions completed</p>
                                    </div>
                                    <div style={{ textAlign: 'right', minWidth: 120 }}>
                                        <p style={{ fontSize: 12, color: '#7a96b4', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>Next session</p>
                                        <p style={{ fontSize: 13, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{p.nextSession}</p>
                                    </div>
                                    <Badge variant={p.status === 'active' ? 'teal' : p.status === 'new' ? 'purple' : 'gray'} dot>
                                        {p.status === 'active' ? 'Active' : p.status === 'new' ? 'New Patient' : 'Closed'}
                                    </Badge>
                                    <div style={{ display: 'flex', gap: 8 }}>
                                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('chat')} style={{ fontFamily: "'Poppins', sans-serif" }}>Message</button>
                                        <button className="btn btn-primary btn-sm" onClick={() => navigate('video-call')} style={{ fontFamily: "'Poppins', sans-serif" }}>Session</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── SCHEDULE ── */}
                {activeTab === 'schedule' && (
                    <div style={{ maxWidth: 720 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Today's Schedule</h2>
                            <p style={{ fontSize: 14, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>Sunday, 25 May 2026</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            {SCHEDULE.map((s, i) => (
                                <div key={i} style={{
                                    background: 'white', borderRadius: 16,
                                    border: `1px solid ${s.status === 'upcoming' ? '#26b8a0' : '#cce8e3'}`,
                                    padding: '18px 24px',
                                    display: 'flex', alignItems: 'center', gap: 20,
                                    opacity: s.status === 'completed' ? 0.7 : 1,
                                }}>
                                    <div style={{ width: 80, flexShrink: 0, textAlign: 'center' }}>
                                        <p style={{ fontSize: 15, fontWeight: 800, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{s.time}</p>
                                        <p style={{ fontSize: 11, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{s.duration}</p>
                                    </div>
                                    <div style={{ width: 3, height: 40, background: s.status === 'upcoming' ? '#26b8a0' : s.status === 'break' ? '#cce8e3' : '#d0d0d0', borderRadius: 2, flexShrink: 0 }} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{s.patient}</p>
                                        {s.type && <p style={{ fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{s.type}</p>}
                                    </div>
                                    {s.status === 'upcoming' && (
                                        <button className="btn btn-primary btn-sm" onClick={() => navigate('video-call')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                            Start Session
                                        </button>
                                    )}
                                    {s.status === 'completed' && (
                                        <Badge variant="gray" size="sm">Completed</Badge>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── COLLABORATE ── */}
                {activeTab === 'collaborate' && (
                    <div style={{ maxWidth: 740 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Professional Collaboration</h2>
                        <p style={{ color: '#2c4a5e', marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>
                            Connect with other healthcare professionals for co-consultations, case discussions, and shared learning.
                        </p>

                        {/* Incoming requests */}
                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>Incoming Requests</h3>
                        {COLLAB.map((c, i) => (
                            <div key={i} className="card" style={{ padding: 24, marginBottom: 16 }}>
                                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
                                    <Avatar initials={c.initials} size={50} color={c.color} />
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{c.from}</p>
                                        <p style={{ fontSize: 13, color: '#26b8a0', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>{c.specialty}</p>
                                        <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.65, fontFamily: "'Poppins', sans-serif" }}>{c.msg}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button className="btn btn-primary btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Accept & Message</button>
                                    <button className="btn btn-ghost btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Schedule Call</button>
                                    <button className="btn btn-outline btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Decline</button>
                                </div>
                            </div>
                        ))}

                        {/* Start new collab */}
                        <div style={{ background: 'linear-gradient(135deg,#e6f8f5,#f0f7f6)', borderRadius: 20, padding: 28, border: '1px solid #cce8e3', marginTop: 8 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Start a Collaboration</h3>
                            <p style={{ fontSize: 13, color: '#2c4a5e', marginBottom: 18, fontFamily: "'Poppins', sans-serif" }}>Reach out to a specialist on the platform for case consultation or co-authoring.</p>
                            <div style={{ display: 'flex', gap: 10 }}>
                                <input placeholder="Search doctors by name or specialty…" style={{ flex: 1, padding: '11px 18px', border: '1.5px solid #cce8e3', borderRadius: 50, fontSize: 13, fontFamily: "'Poppins', sans-serif" }} />
                                <button className="btn btn-primary btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Find</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── PUBLISH ── */}
                {activeTab === 'publish' && (
                    <div style={{ maxWidth: 700 }}>
                        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Publish Wellness Article</h2>
                        <p style={{ color: '#2c4a5e', marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>
                            Share your professional knowledge with the SanaMind community. Articles appear on your profile and the Wellness Hub.
                        </p>

                        {published ? (
                            <div style={{ textAlign: 'center', padding: '60px 32px', background: 'white', borderRadius: 20, border: '1px solid #cce8e3' }}>
                                <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>Article Published!</h3>
                                <p style={{ color: '#2c4a5e', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>Your article is now live on your profile and the Wellness Hub.</p>
                                <button className="btn btn-primary" onClick={() => { setPublished(false); setArticle({ title: '', content: '', category: 'Mental Health' }); }} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Write Another
                                </button>
                            </div>
                        ) : (
                            <div style={{ background: 'white', borderRadius: 20, padding: 32, border: '1px solid #cce8e3' }}>
                                <div style={{ marginBottom: 18 }}>
                                    <label className="form-label">Article Title</label>
                                    <input className="form-input" value={article.title} onChange={e => setArticle(a => ({ ...a, title: e.target.value }))} placeholder="e.g. Five Signs You May Be Experiencing Burnout" style={{ fontFamily: "'Poppins', sans-serif" }} />
                                </div>
                                <div style={{ marginBottom: 18 }}>
                                    <label className="form-label">Category</label>
                                    <select value={article.category} onChange={e => setArticle(a => ({ ...a, category: e.target.value }))} className="form-input" style={{ fontFamily: "'Poppins', sans-serif" }}>
                                        {['Mental Health', 'Stress & Burnout', 'Sleep', 'Nutrition', 'Family Wellness', 'Mindfulness', 'Trauma & Recovery'].map(c => (
                                            <option key={c} style={{ fontFamily: "'Poppins', sans-serif" }}>{c}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ marginBottom: 24 }}>
                                    <label className="form-label">Article Content</label>
                                    <textarea
                                        rows={10}
                                        className="form-input"
                                        value={article.content}
                                        onChange={e => setArticle(a => ({ ...a, content: e.target.value }))}
                                        placeholder="Write your full article here. Share your expertise — it will genuinely help people."
                                        style={{ resize: 'vertical', fontFamily: "'Poppins', sans-serif" }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: 12 }}>
                                    <button className="btn btn-outline btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>Save as Draft</button>
                                    <button
                                        className="btn btn-primary"
                                        style={{ fontFamily: "'Poppins', sans-serif", opacity: article.title && article.content ? 1 : 0.4 }}
                                        disabled={!article.title || !article.content}
                                        onClick={() => setPublished(true)}
                                    >Publish Article</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 900px) {
          .doc-stats { grid-template-columns: 1fr 1fr !important; }
          .doc-overview-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .doc-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}