import React, { useState } from 'react';
import { testimonials } from '../data/mockData';
import SectionHeader from '../components/ui/SectionHeader';
import StarRating from '../components/ui/StarRating';

/* ─────────────────────────────────────────────
   TestimonialsPage
   - Featured success stories
   - Healing journey timeline
   - Full testimonial grid
   - Submit your own story
───────────────────────────────────────────── */

const EXTENDED = [
    ...testimonials,
    {
        id: 4,
        name: 'Ngozi Adeyemi',
        role: 'Postpartum Recovery',
        initials: 'NA',
        color: '#26b8a0',
        text: 'After the birth of my second child I felt completely lost — not like myself at all. SanaMind connected me with a specialist within 24 hours. Three months later I feel present, joyful, and genuinely well. I am so grateful.',
        rating: 5,
    },
    {
        id: 5,
        name: 'Yusuf Ibrahim',
        role: 'Grief Counselling',
        initials: 'YI',
        color: '#1e3f6e',
        text: 'Losing my father was the hardest thing I have faced. I was not able to talk to anyone around me. My counsellor on SanaMind gave me space to grieve properly for the first time. She helped me carry the loss without being crushed by it.',
        rating: 5,
    },
    {
        id: 6,
        name: 'Mei-Lin Zhang',
        role: 'Academic Stress',
        initials: 'MZ',
        color: '#6070e0',
        text: 'As a medical student the pressure was unbearable. Weekly sessions with Dr. Sharma genuinely kept me going through finals. I graduated top of my cohort — but more importantly, I am mentally healthy and proud of myself.',
        rating: 5,
    },
];

const JOURNEY_STEPS = [
    { step: '01', title: 'The First Step', desc: 'Sarah signed up on a Tuesday night, after months of telling herself she was "fine". She chose an anonymous username and just read for a week.' },
    { step: '02', title: 'Finding Her Doctor', desc: 'She filtered by "anxiety" and "English-speaking" and found Dr. Nwosu. She read every testimonial twice. Then booked a 15-minute intro call.' },
    { step: '03', title: 'The First Session', desc: '"I cried the whole time and she never once made me feel embarrassed. I felt heard for the first time in years." — Sarah, Week 1.' },
    { step: '04', title: 'Weekly Sessions', desc: 'Over 12 weeks, Sarah learned CBT techniques, built a morning routine, and started sleeping through the night again.' },
    { step: '05', title: 'Joining the Community', desc: 'Six months in, Sarah shared her story anonymously. It received 200+ "supports" and inspired three other members to book their first session.' },
    { step: '06', title: 'Today', desc: '"I still have hard days. But I have tools now. I have a doctor who knows me. And I know I am not alone." — Sarah, 8 months later.' },
];

export default function TestimonialsPage({ navigate }) {
    const [submitForm, setSubmitForm] = useState({ name: '', story: '', role: '', rating: 5, anonymous: false });
    const [submitted, setSubmitted] = useState(false);
    const [showForm, setShowForm] = useState(false);

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '72px 0 56px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Patient Stories</span>
                    <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                        Real People. Real Healing.
                    </h1>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 520, margin: '0 auto 28px', fontFamily: "'Poppins', sans-serif" }}>
                        These stories belong to real members of our community. Every word is genuine. Every journey is ongoing.
                    </p>
                    <button className="btn btn-primary" onClick={() => setShowForm(true)} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Share Your Story
                    </button>
                </div>
            </div>

            {/* Featured story */}
            <section style={{ background: '#f5fbfa', padding: '72px 0' }}>
                <div className="container">
                    <SectionHeader chip="Featured Story" title="Sarah's Journey — From Struggling to Thriving" center />
                    <div style={{ maxWidth: 860, margin: '48px auto 0' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                            {JOURNEY_STEPS.map((s, i) => (
                                <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                                    {/* Timeline line */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 56, flexShrink: 0 }}>
                                        <div style={{
                                            width: 48, height: 48, borderRadius: '50%',
                                            background: i % 2 === 0 ? '#0b1f3a' : '#26b8a0',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'white', fontWeight: 800, fontSize: 13,
                                            flexShrink: 0, zIndex: 1,
                                            fontFamily: "'Poppins', sans-serif",
                                        }}>{s.step}</div>
                                        {i < JOURNEY_STEPS.length - 1 && (
                                            <div style={{ width: 2, flex: 1, minHeight: 32, background: '#cce8e3', margin: '4px 0' }} />
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div style={{ paddingBottom: i < JOURNEY_STEPS.length - 1 ? 28 : 0 }}>
                                        <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>{s.title}</h3>
                                        <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.75, fontFamily: "'Poppins', sans-serif" }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* All testimonials grid */}
            <section className="section">
                <div className="container">
                    <SectionHeader chip="All Stories" title="Healing, in their own words" center />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 48 }} className="test-grid">
                        {EXTENDED.map((t, i) => (
                            <div key={t.id} className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', animation: `fadeUp 0.5s ${i * 0.08}s ease both` }}>
                                <StarRating value={t.rating} showValue={false} size={16} />
                                <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.78, margin: '16px 0 20px', flex: 1, fontFamily: "'Poppins', sans-serif" }}>
                                    "{t.text}"
                                </p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 16, borderTop: '1px solid #f0f7f6' }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: '50%',
                                        background: `linear-gradient(135deg,${t.color},${t.color}88)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
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
          @media (max-width: 900px) { .test-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px) { .test-grid { grid-template-columns: 1fr !important; } }
        `}</style>
            </section>

            {/* Submit form modal */}
            {showForm && (
                <div style={{
                    position: 'fixed', inset: 0,
                    background: 'rgba(11,31,58,0.55)', backdropFilter: 'blur(5px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 2000, padding: 24,
                }} onClick={e => { if (e.target === e.currentTarget) setShowForm(false); }}>
                    <div style={{ background: 'white', borderRadius: 24, padding: 36, width: '100%', maxWidth: 520, animation: 'fadeUp 0.3s ease both', maxHeight: '90vh', overflowY: 'auto' }}>
                        {submitted ? (
                            <div style={{ textAlign: 'center', padding: '24px 0' }}>
                                <div style={{ fontSize: 56, marginBottom: 16 }}>💚</div>
                                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>Thank You for Sharing</h3>
                                <p style={{ color: '#2c4a5e', marginBottom: 24, lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" }}>
                                    Your story will be reviewed by our team and published within 48 hours. You are helping others take that first step.
                                </p>
                                <button className="btn btn-primary" onClick={() => { setShowForm(false); setSubmitted(false); }} style={{ fontFamily: "'Poppins', sans-serif" }}>Done</button>
                            </div>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Share Your Story</h3>
                                    <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#7a96b4' }}>✕</button>
                                </div>
                                <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 22, fontFamily: "'Poppins', sans-serif" }}>
                                    Your story could be the thing that encourages someone else to seek help.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                                    <div>
                                        <label className="form-label">Your Name</label>
                                        <input className="form-input" value={submitForm.name} onChange={e => setSubmitForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Sarah M." style={{ fontFamily: "'Poppins', sans-serif" }} />
                                    </div>
                                    <div>
                                        <label className="form-label">Topic / Journey</label>
                                        <input className="form-input" value={submitForm.role} onChange={e => setSubmitForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g. Anxiety Recovery" style={{ fontFamily: "'Poppins', sans-serif" }} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: 14 }}>
                                    <label className="form-label">Your Story</label>
                                    <textarea rows={5} className="form-input" value={submitForm.story} onChange={e => setSubmitForm(f => ({ ...f, story: e.target.value }))} placeholder="In your own words, share how SanaMind helped you…" style={{ resize: 'vertical', fontFamily: "'Poppins', sans-serif" }} />
                                </div>
                                <div style={{ marginBottom: 20 }}>
                                    <label className="form-label" style={{ marginBottom: 10 }}>Your Rating</label>
                                    <StarRating value={submitForm.rating} onChange={r => setSubmitForm(f => ({ ...f, rating: r }))} size={24} />
                                </div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, cursor: 'pointer', fontSize: 13, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>
                                    <input type="checkbox" checked={submitForm.anonymous} onChange={e => setSubmitForm(f => ({ ...f, anonymous: e.target.checked }))} style={{ accentColor: '#26b8a0' }} />
                                    Publish anonymously (your name will be hidden)
                                </label>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', opacity: submitForm.name && submitForm.story ? 1 : 0.45, fontFamily: "'Poppins', sans-serif" }}
                                    disabled={!submitForm.name || !submitForm.story}
                                    onClick={() => setSubmitted(true)}
                                >Submit Story</button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', padding: '72px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(24px,4vw,38px)', fontWeight: 800, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                        Your story could be next.
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', marginBottom: 32, fontFamily: "'Poppins', sans-serif" }}>
                        The first step is always the hardest. Let us walk with you.
                    </p>
                    <button className="btn btn-white btn-lg" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Find Your Doctor
                    </button>
                </div>
            </section>
        </div>
    );
}