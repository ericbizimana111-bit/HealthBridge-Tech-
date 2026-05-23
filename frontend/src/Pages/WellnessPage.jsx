import { useState } from 'react';
import { wellnessTips } from '../data/mockData';

const MOODS = [
    { emoji: '😞', label: 'Struggling', val: 1 },
    { emoji: '😕', label: 'Low', val: 2 },
    { emoji: '😐', label: 'Okay', val: 3 },
    { emoji: '🙂', label: 'Good', val: 4 },
    { emoji: '😊', label: 'Great', val: 5 },
];

const HABITS = [
    { id: 'water', icon: '💧', label: 'Drank 8 glasses of water' },
    { id: 'exercise', icon: '🚶', label: 'Moved my body today' },
    { id: 'sleep', icon: '😴', label: 'Slept 7–9 hours' },
    { id: 'breathe', icon: '🧘', label: 'Practised mindful breathing' },
    { id: 'journal', icon: '📝', label: 'Journalled or reflected' },
    { id: 'connect', icon: '🤝', label: 'Connected with someone I trust' },
];

export default function WellnessPage({ navigate }) {
    const [mood, setMood] = useState(null);
    const [checkedHabits, setCheckedHabits] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('tips');

    const toggleHabit = (id) => setCheckedHabits(prev => ({ ...prev, [id]: !prev[id] }));
    const checkedCount = Object.values(checkedHabits).filter(Boolean).length;

    const affirmations = [
        "You are doing better than you think.",
        "Progress takes time — and that is perfectly okay.",
        "Every small act of self-care matters deeply.",
        "Your feelings are valid. You are valid.",
        "Rest is productive. Please rest.",
        "You have overcome difficult days before. You will again.",
    ];

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>
            {/* Header */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '60px 0 40px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Wellness Hub</span>
                    <h1 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: 'white', marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>
                        Your Daily Wellness Space
                    </h1>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', maxWidth: 480, margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>
                        Small, consistent habits create lasting transformation. Let's build yours.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #cce8e3', background: 'white', position: 'sticky', top: 70, zIndex: 100 }}>
                <div className="container" style={{ display: 'flex', gap: 0 }}>
                    {['tips', 'tracker', 'affirmations'].map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                            fontSize: 14, fontWeight: activeTab === tab ? 700 : 500,
                            color: activeTab === tab ? '#26b8a0' : '#7a96b4',
                            borderBottom: `2px solid ${activeTab === tab ? '#26b8a0' : 'transparent'}`,
                            textTransform: 'capitalize', transition: 'all 0.2s',
                            fontFamily: "'Poppins', sans-serif",
                        }}>{tab === 'tips' ? 'Wellness Tips' : tab === 'tracker' ? 'Daily Tracker' : 'Affirmations'}</button>
                    ))}
                </div>
            </div>

            <div className="container" style={{ padding: '48px 24px' }}>

                {/* ── TIPS TAB ── */}
                {activeTab === 'tips' && (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }} className="tips-grid">
                            {wellnessTips.map((tip, i) => (
                                <div key={tip.id} className="card" style={{ padding: 28, animation: `fadeUp 0.5s ${i * 0.1}s ease both` }}>
                                    <div style={{ fontSize: 40, marginBottom: 16 }}>{tip.icon}</div>
                                    <span style={{ display: 'inline-block', background: tip.color, color: '#0b1f3a', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '3px 10px', borderRadius: 50, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{tip.category}</span>
                                    <h4 style={{ fontSize: 17, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>{tip.title}</h4>
                                    <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" }}>{tip.tip}</p>
                                </div>
                            ))}
                        </div>

                        {/* Quick exercises */}
                        <div style={{ marginTop: 56 }}>
                            <h2 style={{ fontSize: 26, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>2-Minute Exercises</h2>
                            <p style={{ color: '#2c4a5e', marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>Tiny practices with a big impact on your day.</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }} className="ex-grid">
                                {[
                                    { title: 'Box Breathing', desc: 'Breathe in for 4 counts, hold for 4, breathe out for 4, hold for 4. Repeat 5 times. Activates your parasympathetic system instantly.', icon: '🌬️', color: '#e8eeff' },
                                    { title: 'Body Scan', desc: 'Close your eyes. Starting from your toes, slowly bring gentle awareness up through your body. Notice without judgment. This anchors you in the present moment.', icon: '🧘', color: '#e6f8f5' },
                                    { title: 'Gratitude Micro-Practice', desc: 'Name three specific things you are grateful for right now — the smaller and more concrete, the better. This rewires your brain toward positivity.', icon: '🌱', color: '#e8f5e0' },
                                    { title: '5-4-3-2-1 Grounding', desc: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Powerful for anxiety and overwhelm — brings you fully into the present.', icon: '🔍', color: '#fff5e6' },
                                ].map((ex, i) => (
                                    <div key={i} className="card" style={{ padding: 28 }}>
                                        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                                            <div style={{ width: 52, height: 52, borderRadius: 14, background: ex.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{ex.icon}</div>
                                            <div>
                                                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>{ex.title}</h4>
                                                <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, fontFamily: "'Poppins', sans-serif" }}>{ex.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* ── TRACKER TAB ── */}
                {activeTab === 'tracker' && (
                    <div style={{ maxWidth: 680, margin: '0 auto' }}>
                        {!submitted ? (
                            <>
                                {/* Mood */}
                                <div className="card" style={{ padding: 32, marginBottom: 24 }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>
                                        How are you feeling today?
                                    </h3>
                                    <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>
                                        Checking in with yourself is the first step to caring for yourself.
                                    </p>
                                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                                        {MOODS.map(m => (
                                            <button key={m.val} onClick={() => setMood(m.val)} style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                                                padding: '16px 20px', borderRadius: 16,
                                                border: `2px solid ${mood === m.val ? '#26b8a0' : '#cce8e3'}`,
                                                background: mood === m.val ? '#e6f8f5' : 'white',
                                                cursor: 'pointer', transition: 'all 0.2s', minWidth: 80,
                                                fontFamily: "'Poppins', sans-serif",
                                            }}>
                                                <span style={{ fontSize: 32 }}>{m.emoji}</span>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: mood === m.val ? '#26b8a0' : '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{m.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Habits */}
                                <div className="card" style={{ padding: 32, marginBottom: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                        <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Daily Habits</h3>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{checkedCount} / {HABITS.length}</span>
                                    </div>
                                    <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Check off what you've done today.</p>
                                    {/* Progress bar */}
                                    <div style={{ height: 6, background: '#e8f5f2', borderRadius: 3, marginBottom: 24 }}>
                                        <div style={{ height: '100%', width: `${(checkedCount / HABITS.length) * 100}%`, background: 'linear-gradient(90deg,#26b8a0,#34d4ba)', borderRadius: 3, transition: 'width 0.3s' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {HABITS.map(h => (
                                            <label key={h.id} style={{
                                                display: 'flex', alignItems: 'center', gap: 12,
                                                padding: '14px 16px', borderRadius: 12,
                                                border: `1.5px solid ${checkedHabits[h.id] ? '#26b8a0' : '#cce8e3'}`,
                                                background: checkedHabits[h.id] ? '#e6f8f5' : 'white',
                                                cursor: 'pointer', transition: 'all 0.18s',
                                            }}>
                                                <input type="checkbox" checked={!!checkedHabits[h.id]} onChange={() => toggleHabit(h.id)} style={{ width: 18, height: 18, accentColor: '#26b8a0' }} />
                                                <span style={{ fontSize: 18 }}>{h.icon}</span>
                                                <span style={{
                                                    fontSize: 14, fontFamily: "'Poppins', sans-serif",
                                                    fontWeight: checkedHabits[h.id] ? 600 : 400,
                                                    color: checkedHabits[h.id] ? '#0b1f3a' : '#2c4a5e',
                                                    textDecoration: checkedHabits[h.id] ? 'none' : 'none',
                                                }}>{h.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => setSubmitted(true)}>
                                    Save Today's Check-in
                                </button>
                            </>
                        ) : (
                            <div className="card" style={{ padding: 48, textAlign: 'center' }}>
                                <div style={{ fontSize: 56, marginBottom: 16 }}>🌟</div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>
                                    Well done for checking in!
                                </h3>
                                <p style={{ color: '#2c4a5e', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>
                                    You completed <strong style={{ color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{checkedCount} of {HABITS.length}</strong> habits today.
                                </p>
                                {mood && <p style={{ fontSize: 28, marginBottom: 24 }}>{MOODS.find(m => m.val === mood)?.emoji}</p>}
                                <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>
                                    Every check-in is an act of self-love. See you tomorrow.
                                </p>
                                <button className="btn btn-ghost" onClick={() => { setSubmitted(false); setCheckedHabits({}); setMood(null); }} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                    Reset for Tomorrow
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ── AFFIRMATIONS TAB ── */}
                {activeTab === 'affirmations' && (
                    <div style={{ maxWidth: 700, margin: '0 auto' }}>
                        <p style={{ fontSize: 16, color: '#2c4a5e', marginBottom: 36, textAlign: 'center', fontFamily: "'Poppins', sans-serif" }}>
                            Words have power. These affirmations are written by our mental health professionals to help rewire how you talk to yourself.
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {affirmations.map((a, i) => (
                                <div key={i} style={{
                                    background: i % 2 === 0 ? 'linear-gradient(135deg,#e6f8f5,#f0faf8)' : 'linear-gradient(135deg,#f5f0ff,#fff)',
                                    borderRadius: 16, padding: '24px 28px',
                                    border: '1px solid #cce8e3',
                                    animation: `fadeUp 0.4s ${i * 0.08}s ease both`,
                                }}>
                                    <p style={{ fontSize: 18, fontWeight: 600, color: '#0b1f3a', lineHeight: 1.5, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                                        "{a}"
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 40 }}>
                            <p style={{ color: '#7a96b4', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>Need professional support alongside these practices?</p>
                            <button className="btn btn-primary" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                Talk to a Professional
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @media (max-width: 900px) { .tips-grid { grid-template-columns: 1fr 1fr !important; } .ex-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 480px) { .tips-grid { grid-template-columns: 1fr !important; } }
      `}</style>
        </div>
    );
}
