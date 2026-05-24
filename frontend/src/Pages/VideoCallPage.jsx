import React, { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   VideoCallPage
   Full-screen video consultation interface.
   Supports camera, mic, screen share, notes,
   participants panel, and session timer.
───────────────────────────────────────────── */

export default function VideoCallPage({ navigate, doctor }) {
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [handRaised, setHand] = useState(false);
    const [showNotes, setShowNotes] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [notes, setNotes] = useState('');
    const [seconds, setSeconds] = useState(0);
    const [ending, setEnding] = useState(false);

    const doc = doctor || {
        name: 'Dr. Amara Nwosu',
        specialty: 'Mental Health Specialist',
        initials: 'AN',
        color: '#26b8a0',
    };

    // Session timer
    useEffect(() => {
        const t = setInterval(() => setSeconds(s => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const ControlBtn = ({ icon, label, active = true, danger = false, onClick, badge }) => (
        <button
            onClick={onClick}
            title={label}
            style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                background: danger ? 'rgba(220,60,60,0.85)' : active ? 'rgba(255,255,255,0.12)' : 'rgba(220,60,60,0.5)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 16, padding: '12px 18px',
                cursor: 'pointer', position: 'relative',
                transition: 'all 0.2s', minWidth: 64,
                fontFamily: "'Poppins', sans-serif",
            }}
            onMouseEnter={e => e.currentTarget.style.background = danger ? 'rgba(220,60,60,1)' : 'rgba(255,255,255,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = danger ? 'rgba(220,60,60,0.85)' : active ? 'rgba(255,255,255,0.12)' : 'rgba(220,60,60,0.5)'}
        >
            <span style={{ fontSize: 22 }}>{icon}</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', fontWeight: 500, fontFamily: "'Poppins', sans-serif" }}>{label}</span>
            {badge && (
                <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, borderRadius: '50%', background: '#26b8a0', border: '2px solid #0b1f3a' }} />
            )}
        </button>
    );

    if (ending) {
        return (
            <div style={{
                minHeight: '100vh', background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Poppins', sans-serif",
            }}>
                <div style={{ textAlign: 'center', color: 'white', maxWidth: 440, padding: 40 }}>
                    <div style={{ fontSize: 72, marginBottom: 24 }}>🌿</div>
                    <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>
                        Session Complete
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                        Duration: <strong style={{ color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{formatTime(seconds)}</strong>
                    </p>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, marginBottom: 36, fontFamily: "'Poppins', sans-serif" }}>
                        Thank you for attending your session with <strong style={{ fontFamily: "'Poppins', sans-serif" }}>{doc.name}</strong>.
                        Taking this time for yourself is an act of courage and care.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-primary" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>Book Next Session</button>
                        <button className="btn btn-outline-white" onClick={() => navigate('home')} style={{ fontFamily: "'Poppins', sans-serif" }}>Go Home</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{
            height: '100vh', background: '#080f1c',
            display: 'flex', flexDirection: 'column',
            position: 'relative', overflow: 'hidden',
            fontFamily: "'Poppins', sans-serif",
        }}>
            {/* Top bar */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 28px',
                background: 'linear-gradient(180deg,rgba(8,15,28,0.9) 0%,transparent 100%)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🧠</div>
                    <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif" }}>SanaMind Consultation</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: "'Poppins', sans-serif" }}>{doc.name} · {doc.specialty}</p>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    {/* Live indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(38,184,160,0.18)', border: '1px solid rgba(38,184,160,0.35)', borderRadius: 50, padding: '5px 14px' }}>
                        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#26b8a0', display: 'inline-block', animation: 'pulse 1.4s ease-in-out infinite' }} />
                        <span style={{ fontSize: 12, color: '#9de4d8', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>LIVE</span>
                    </div>
                    {/* Timer */}
                    <div style={{ background: 'rgba(0,0,0,0.45)', borderRadius: 50, padding: '5px 14px' }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif", letterSpacing: 1 }}>{formatTime(seconds)}</span>
                    </div>
                </div>
            </div>

            {/* Main video area */}
            <div style={{ flex: 1, display: 'flex', position: 'relative' }}>

                {/* Doctor video (main) */}
                <div style={{
                    flex: 1,
                    background: `linear-gradient(145deg, ${doc.color}22 0%, #0b1f3a 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                }}>
                    {/* Doctor avatar placeholder */}
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            width: 140, height: 140, borderRadius: '50%', margin: '0 auto 20px',
                            background: `linear-gradient(135deg, ${doc.color}, ${doc.color}88)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'white', fontWeight: 800, fontSize: 52,
                            boxShadow: `0 0 60px ${doc.color}44`,
                            fontFamily: "'Poppins', sans-serif",
                        }}>{doc.initials}</div>
                        <p style={{ fontSize: 20, fontWeight: 700, color: 'white', fontFamily: "'Poppins', sans-serif" }}>{doc.name}</p>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontFamily: "'Poppins', sans-serif" }}>{doc.specialty}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center', marginTop: 10 }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#26b8a0', display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite' }} />
                            <span style={{ fontSize: 13, color: '#9de4d8', fontFamily: "'Poppins', sans-serif" }}>Connected · HD video</span>
                        </div>
                    </div>

                    {/* Doctor name tag */}
                    <div style={{
                        position: 'absolute', bottom: 20, left: 20,
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                        borderRadius: 10, padding: '7px 14px',
                    }}>
                        <p style={{ fontSize: 13, color: 'white', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>{doc.name}</p>
                    </div>
                </div>

                {/* Self preview (bottom-right) */}
                <div style={{
                    position: 'absolute', bottom: 90, right: 20,
                    width: 180, height: 120,
                    background: camOn ? 'linear-gradient(135deg,#1e3f6e,#0b1f3a)' : '#111',
                    borderRadius: 16,
                    border: '2px solid rgba(255,255,255,0.18)',
                    overflow: 'hidden',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
                    cursor: 'pointer',
                }}>
                    {camOn ? (
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg,#26b8a0,#34d4ba)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 16, margin: '0 auto 8px', fontFamily: "'Poppins', sans-serif" }}>ME</div>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: "'Poppins', sans-serif" }}>You</p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ fontSize: 28 }}>📷</span>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>Camera off</p>
                        </div>
                    )}
                    <div style={{ position: 'absolute', bottom: 6, left: 8 }}>
                        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontFamily: "'Poppins', sans-serif" }}>You</p>
                    </div>
                </div>

                {/* Side panel — Notes */}
                {showNotes && (
                    <div style={{
                        width: 300, background: 'rgba(11,31,58,0.96)', backdropFilter: 'blur(12px)',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        display: 'flex', flexDirection: 'column', padding: 20,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p style={{ fontWeight: 700, color: 'white', fontSize: 15, fontFamily: "'Poppins', sans-serif" }}>Session Notes</p>
                            <button onClick={() => setShowNotes(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>✕</button>
                        </div>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>Private notes — only you can see these.</p>
                        <textarea
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            placeholder="Write your thoughts, questions, or reflections here…"
                            style={{
                                flex: 1, background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.12)',
                                borderRadius: 12, padding: '12px 14px',
                                color: 'white', fontSize: 13, resize: 'none',
                                lineHeight: 1.65,
                                fontFamily: "'Poppins', sans-serif",
                            }}
                        />
                        <button className="btn btn-primary btn-sm" style={{ marginTop: 12, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }}>
                            Save Notes
                        </button>
                    </div>
                )}

                {/* Side panel — Participants */}
                {showPeople && (
                    <div style={{
                        width: 280, background: 'rgba(11,31,58,0.96)', backdropFilter: 'blur(12px)',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        padding: 20,
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <p style={{ fontWeight: 700, color: 'white', fontSize: 15, fontFamily: "'Poppins', sans-serif" }}>Participants (2)</p>
                            <button onClick={() => setShowPeople(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>✕</button>
                        </div>
                        {[
                            { name: doc.name, role: 'Doctor', initials: doc.initials, color: doc.color, mic: true },
                            { name: 'You', role: 'Patient', initials: 'ME', color: '#1e3f6e', mic: micOn },
                        ].map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg,${p.color},${p.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>{p.initials}</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: 14, fontWeight: 600, color: 'white', fontFamily: "'Poppins', sans-serif" }}>{p.name}</p>
                                    <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>{p.role}</p>
                                </div>
                                <span style={{ fontSize: 16 }}>{p.mic ? '🎙️' : '🔇'}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Bottom controls */}
            <div style={{
                background: 'linear-gradient(0deg,rgba(8,15,28,0.97) 0%,rgba(8,15,28,0.8) 100%)',
                padding: '16px 28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
                flexWrap: 'wrap',
            }}>
                <ControlBtn icon={micOn ? '🎙️' : '🔇'} label={micOn ? 'Mute' : 'Unmute'} active={micOn} onClick={() => setMicOn(!micOn)} />
                <ControlBtn icon={camOn ? '📹' : '📷'} label={camOn ? 'Stop Video' : 'Start Video'} active={camOn} onClick={() => setCamOn(!camOn)} />
                <ControlBtn icon="🖥️" label="Share Screen" onClick={() => { }} />
                <ControlBtn icon="✋" label={handRaised ? 'Lower Hand' : 'Raise Hand'} active={!handRaised} onClick={() => setHand(!handRaised)} badge={handRaised} />
                <ControlBtn icon="📝" label="Notes" onClick={() => { setShowNotes(!showNotes); setShowPeople(false); }} badge={notes.length > 0} />
                <ControlBtn icon="👥" label="People" onClick={() => { setShowPeople(!showPeople); setShowNotes(false); }} />
                <ControlBtn icon="💬" label="Chat" onClick={() => navigate('chat')} />

                {/* End call */}
                <button
                    onClick={() => setEnding(true)}
                    style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                        background: '#dc3c3c', border: 'none',
                        borderRadius: 16, padding: '12px 28px',
                        cursor: 'pointer', transition: 'background 0.2s',
                        fontFamily: "'Poppins', sans-serif",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#ff4444'}
                    onMouseLeave={e => e.currentTarget.style.background = '#dc3c3c'}
                >
                    <span style={{ fontSize: 22 }}>📵</span>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>End Call</span>
                </button>
            </div>
        </div>
    );
}