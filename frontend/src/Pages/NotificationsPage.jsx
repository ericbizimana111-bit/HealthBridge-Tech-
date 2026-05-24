import React, { useState } from 'react';
import Badge from '../components/ui/Badge';

/* ─────────────────────────────────────────────
   NotificationsPage
   Dedicated notification centre with:
   - Tabbed user vs doctor notifications
   - Mark as read / delete
   - Grouped by Today / Earlier
───────────────────────────────────────────── */

const USER_NOTIFS = [
    { id: 1, icon: '📅', title: 'Upcoming Session Reminder', body: 'Your session with Dr. Amara Nwosu is tomorrow at 3:00 PM.', time: '1 hour ago', read: false, type: 'appointment' },
    { id: 2, icon: '💬', title: 'New Message', body: 'Dr. Yuki Tanaka sent you a message: "See you tomorrow!"', time: '3 hours ago', read: false, type: 'message' },
    { id: 3, icon: '💧', title: 'Wellness Reminder', body: 'Time to drink a glass of water and take a short break.', time: '5 hours ago', read: false, type: 'wellness' },
    { id: 4, icon: '✅', title: 'Booking Confirmed', body: 'Your session with Dr. Riya Sharma on Thu 4:00 PM is set.', time: 'Yesterday', read: true, type: 'appointment' },
    { id: 5, icon: '🌟', title: 'Community Post Featured', body: 'Your post "Six months of therapy…" was featured today.', time: 'Yesterday', read: true, type: 'community' },
    { id: 6, icon: '🎵', title: 'New Calm Music Added', body: 'Three new therapeutic tracks have been added to the hub.', time: '2 days ago', read: true, type: 'wellness' },
    { id: 7, icon: '🏥', title: 'Platform Update', body: 'Family therapy group sessions are now available.', time: '3 days ago', read: true, type: 'platform' },
];

const DOCTOR_NOTIFS = [
    { id: 1, icon: '🆕', title: 'New Consultation Request', body: 'Carlos Rivera has requested a session. View their profile.', time: '30 min ago', read: false, type: 'patient' },
    { id: 2, icon: '💬', title: 'Patient Message', body: 'Sarah Mitchell: "I tried the breathing exercise — it helped!"', time: '2 hours ago', read: false, type: 'message' },
    { id: 3, icon: '🤝', title: 'Collaboration Request', body: 'Dr. Kwame Osei has sent a co-consultation request.', time: '4 hours ago', read: false, type: 'collab' },
    { id: 4, icon: '⭐', title: 'New Patient Review', body: 'James Okoye left a 5-star review: "Incredibly supportive."', time: 'Yesterday', read: true, type: 'review' },
    { id: 5, icon: '📅', title: 'Session Starting Soon', body: 'Your session with Priya Anand starts in 15 minutes.', time: 'Yesterday', read: true, type: 'session' },
    { id: 6, icon: '📝', title: 'Article Published', body: 'Your article "Grounding Techniques" is now live.', time: '2 days ago', read: true, type: 'article' },
];

const TYPE_BADGE = {
    appointment: 'teal',
    message: 'navy',
    wellness: 'green',
    community: 'purple',
    platform: 'gray',
    patient: 'teal',
    collab: 'purple',
    review: 'orange',
    session: 'teal',
    article: 'navy',
};

function NotifItem({ notif, onRead, onDelete }) {
    return (
        <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            padding: '18px 24px',
            background: notif.read ? 'white' : '#f5fbfa',
            borderBottom: '1px solid #f0f7f6',
            transition: 'background 0.2s',
            position: 'relative',
        }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0faf8'}
            onMouseLeave={e => e.currentTarget.style.background = notif.read ? 'white' : '#f5fbfa'}
        >
            {/* Unread dot */}
            {!notif.read && (
                <span style={{
                    position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                    width: 7, height: 7, borderRadius: '50%', background: '#26b8a0',
                }} />
            )}

            {/* Icon */}
            <div style={{
                width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                background: '#e6f8f5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
            }}>{notif.icon}</div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10, marginBottom: 3 }}>
                    <p style={{
                        fontSize: 14, fontWeight: notif.read ? 500 : 700, color: '#0b1f3a',
                        fontFamily: "'Poppins', sans-serif",
                    }}>{notif.title}</p>
                    <Badge variant={TYPE_BADGE[notif.type] || 'gray'} size="sm">{notif.type}</Badge>
                </div>
                <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.55, marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>
                    {notif.body}
                </p>
                <p style={{ fontSize: 11, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{notif.time}</p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {!notif.read && (
                    <button onClick={() => onRead(notif.id)} style={{
                        padding: '5px 12px', borderRadius: 50, border: '1px solid #cce8e3',
                        background: 'white', fontSize: 11, fontWeight: 600, color: '#26b8a0',
                        cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                        transition: 'all 0.18s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#e6f8f5'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                    >Mark read</button>
                )}
                <button onClick={() => onDelete(notif.id)} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#c0d0de', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'color 0.18s',
                }}
                    onMouseEnter={e => e.currentTarget.style.color = '#e57373'}
                    onMouseLeave={e => e.currentTarget.style.color = '#c0d0de'}
                >✕</button>
            </div>
        </div>
    );
}

export default function NotificationsPage() {
    const [tab, setTab] = useState('user');
    const [userNotifs, setUser] = useState(USER_NOTIFS);
    const [docNotifs, setDoc] = useState(DOCTOR_NOTIFS);

    const notifs = tab === 'user' ? userNotifs : docNotifs;
    const setNotifs = tab === 'user' ? setUser : setDoc;

    const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    const deleteNotif = (id) => setNotifs(prev => prev.filter(n => n.id !== id));
    const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

    const unread = notifs.filter(n => !n.read).length;
    const today = notifs.filter(n => ['30 min ago', '1 hour ago', '2 hours ago', '3 hours ago', '4 hours ago', '5 hours ago'].some(t => n.time.includes(t) || n.time === '30 min ago'));
    const earlier = notifs.filter(n => !today.includes(n));

    return (
        <div style={{ paddingTop: 70, minHeight: '100vh', background: '#f5fbfa', fontFamily: "'Poppins', sans-serif" }}>

            {/* Header */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '52px 0 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
                        <div>
                            <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Notification Centre</span>
                            <h1 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: 'white', fontFamily: "'Poppins', sans-serif" }}>
                                Your Notifications
                            </h1>
                        </div>
                        {unread > 0 && (
                            <button onClick={markAllRead} style={{
                                background: 'rgba(38,184,160,0.18)', border: '1px solid rgba(38,184,160,0.3)',
                                borderRadius: 50, padding: '8px 18px',
                                color: '#9de4d8', fontSize: 13, fontWeight: 600,
                                cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
                            }}>
                                Mark all as read ({unread})
                            </button>
                        )}
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: 0 }}>
                        {[
                            { key: 'user', label: 'My Notifications', count: userNotifs.filter(n => !n.read).length },
                            { key: 'doctor', label: 'Doctor Notifications', count: docNotifs.filter(n => !n.read).length },
                        ].map(t => (
                            <button key={t.key} onClick={() => setTab(t.key)} style={{
                                padding: '13px 22px', background: 'none', border: 'none', cursor: 'pointer',
                                fontSize: 14, fontWeight: tab === t.key ? 700 : 500,
                                color: tab === t.key ? 'white' : 'rgba(255,255,255,0.5)',
                                borderBottom: `2px solid ${tab === t.key ? '#26b8a0' : 'transparent'}`,
                                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8,
                                fontFamily: "'Poppins', sans-serif",
                            }}>
                                {t.label}
                                {t.count > 0 && (
                                    <span style={{
                                        background: '#26b8a0', color: 'white',
                                        fontSize: 11, fontWeight: 700,
                                        width: 20, height: 20, borderRadius: '50%',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>{t.count}</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Notification list */}
            <div className="container" style={{ padding: '36px 24px' }}>
                <div style={{ maxWidth: 780, background: 'white', borderRadius: 20, border: '1px solid #cce8e3', overflow: 'hidden', boxShadow: '0 4px 24px rgba(11,31,58,0.07)' }}>

                    {notifs.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 32px' }}>
                            <p style={{ fontSize: 48, marginBottom: 14 }}>🔔</p>
                            <p style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>All caught up!</p>
                            <p style={{ fontSize: 14, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>No notifications right now.</p>
                        </div>
                    ) : (
                        <>
                            {today.length > 0 && (
                                <>
                                    <div style={{ padding: '12px 24px', background: '#f0f7f6', borderBottom: '1px solid #e8f5f2' }}>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: '#26b8a0', textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: "'Poppins', sans-serif" }}>Today</p>
                                    </div>
                                    {today.map(n => <NotifItem key={n.id} notif={n} onRead={markRead} onDelete={deleteNotif} />)}
                                </>
                            )}
                            {earlier.length > 0 && (
                                <>
                                    <div style={{ padding: '12px 24px', background: '#f0f7f6', borderBottom: '1px solid #e8f5f2' }}>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: '#7a96b4', textTransform: 'uppercase', letterSpacing: 1.2, fontFamily: "'Poppins', sans-serif" }}>Earlier</p>
                                    </div>
                                    {earlier.map(n => <NotifItem key={n.id} notif={n} onRead={markRead} onDelete={deleteNotif} />)}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}