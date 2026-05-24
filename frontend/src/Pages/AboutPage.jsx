import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/* ─────────────────────────────────────────────
   AboutPage
   Platform story, mission, values, team,
   trusted organisations, and impact numbers.
───────────────────────────────────────────── */

const TEAM = [
    { name: 'Dr. Fatima Al-Rashid', role: 'Chief Medical Officer', initials: 'FA', color: '#26b8a0', bio: 'Psychiatrist with 20 years in global mental health advocacy.' },
    { name: 'Marcus Chen', role: 'Chief Executive Officer', initials: 'MC', color: '#0b1f3a', bio: 'Former WHO digital health lead. Passionate about accessible care.' },
    { name: 'Dr. Amelia Santos', role: 'Head of Clinical Quality', initials: 'AS', color: '#6070e0', bio: 'Clinical psychologist and researcher specialising in teletherapy outcomes.' },
    { name: 'Nadia Osei', role: 'Head of Community', initials: 'NO', color: '#1e3f6e', bio: 'Community health worker turned platform builder. Bridges gaps in care.' },
    { name: 'Tariq Mahmood', role: 'Head of Engineering', initials: 'TM', color: '#26b8a0', bio: 'Healthcare software architect building secure, private systems for 10+ years.' },
    { name: 'Lena Bergström', role: 'Head of Wellness Content', initials: 'LB', color: '#f4a04a', bio: 'Certified mindfulness instructor and health writer based in Stockholm.' },
];

const VALUES = [
    { icon: '🔒', title: 'Privacy First', desc: 'Your conversations are end-to-end encrypted. Your data is never sold, shared, or used for advertising.' },
    { icon: '🌍', title: 'Globally Inclusive', desc: 'Professionals in 54 countries. Multiple languages. Sliding-scale fees. Care for everyone.' },
    { icon: '❤️', title: 'Human-Centred', desc: 'Technology should support human connection — never replace it. We design for warmth, not efficiency.' },
    { icon: '🎓', title: 'Clinically Sound', desc: 'Every professional is vetted, licensed, and trained. Evidence-based approaches only.' },
    { icon: '🌱', title: 'Whole-Person Care', desc: 'Mental, physical, emotional, and social wellbeing — addressed together, not in silos.' },
    { icon: '🤝', title: 'Community-Driven', desc: 'Our community shapes the platform. Real people with lived experience guide every decision.' },
];

const ORGS = [
    { name: 'WHO Partner', initials: 'WHO', color: '#0b1f3a' },
    { name: 'UNICEF Health', initials: 'UNI', color: '#26b8a0' },
    { name: 'Rwanda Health Board', initials: 'RHB', color: '#1e3f6e' },
    { name: 'Lagos Mental Health', initials: 'LMH', color: '#6070e0' },
    { name: 'NHS Digital', initials: 'NHS', color: '#0b1f3a' },
    { name: 'APA Foundation', initials: 'APA', color: '#26b8a0' },
];

function AnimatedCard({ children, delay = 0 }) {
    const [ref, visible] = useScrollAnimation(0.1);
    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
        }}>{children}</div>
    );
}

export default function AboutPage({ navigate }) {
    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>

            {/* ── HERO ── */}
            <section style={{
                background: 'linear-gradient(145deg,#0b1f3a 0%,#1e3f6e 60%,#26b8a020 100%)',
                padding: '96px 0 80px', position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(38,184,160,0.1) 0%,transparent 70%)' }} />
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Our Story</span>
                    <h1 style={{ fontSize: 'clamp(32px,5vw,58px)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 20, fontFamily: "'Poppins', sans-serif" }}>
                        Built for People Who<br />
                        <span style={{ color: '#26b8a0' }}>Deserve Better Care</span>
                    </h1>
                    <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, maxWidth: 600, margin: '0 auto 36px', fontFamily: "'Poppins', sans-serif" }}>
                        SanaMind was founded in 2022 by a team of clinicians, technologists, and community health advocates who believed the gap between people and professional mental health care was not acceptable.
                    </p>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Meet Our Doctors
                    </button>
                </div>
            </section>

            {/* ── MISSION ── */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="mission-grid">
                        <div>
                            <SectionHeader
                                chip="Our Mission"
                                title="Closing the gap between people and professional care"
                                subtitle="Across the world, 75% of people with mental health challenges receive no treatment. We exist to change that — one conversation, one connection, one session at a time."
                            />
                            <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
                                {[
                                    'Make professional care affordable and accessible to everyone',
                                    'Connect people with professionals who genuinely understand them',
                                    'Build the most trusted, private, and human-centred health platform',
                                    'Reduce stigma through community, education, and open conversation',
                                ].map((point, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                        <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e6f8f5', color: '#26b8a0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>✓</span>
                                        <p style={{ fontSize: 15, color: '#2c4a5e', lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>{point}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats panel */}
                        <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', borderRadius: 28, padding: 40, position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(38,184,160,0.08)' }} />
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, position: 'relative', zIndex: 1 }}>
                                {[
                                    { val: '2022', label: 'Founded' },
                                    { val: '54', label: 'Countries Served' },
                                    { val: '12,000+', label: 'Lives Impacted' },
                                    { val: '600+', label: 'Vetted Professionals' },
                                    { val: '98%', label: 'Satisfaction Rate' },
                                    { val: '24 / 7', label: 'Always Available' },
                                ].map((s, i) => (
                                    <div key={i} style={{ textAlign: 'center', padding: '20px 12px', background: 'rgba(255,255,255,0.06)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.09)' }}>
                                        <p style={{ fontSize: 26, fontWeight: 800, color: '#26b8a0', fontFamily: "'Poppins', sans-serif", lineHeight: 1 }}>{s.val}</p>
                                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 6, fontFamily: "'Poppins', sans-serif" }}>{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`@media (max-width: 768px) { .mission-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            {/* ── VALUES ── */}
            <section className="section" style={{ background: '#f5fbfa' }}>
                <div className="container">
                    <SectionHeader chip="Our Values" title="What we stand for" subtitle="Everything we build is guided by six core principles." center />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 22, marginTop: 48 }} className="values-grid">
                        {VALUES.map((v, i) => (
                            <AnimatedCard key={i} delay={i * 0.07}>
                                <div className="card" style={{ padding: 28, height: '100%' }}>
                                    <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
                                    <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>{v.title}</h3>
                                    <p style={{ fontSize: 14, color: '#2c4a5e', lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" }}>{v.desc}</p>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
                <style>{`
          @media (max-width: 900px) { .values-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 480px) { .values-grid { grid-template-columns: 1fr !important; } }
        `}</style>
            </section>

            {/* ── TEAM ── */}
            <section className="section">
                <div className="container">
                    <SectionHeader chip="The Team" title="The people behind SanaMind" subtitle="A multidisciplinary team united by one purpose: your wellbeing." center />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24, marginTop: 48 }} className="team-grid">
                        {TEAM.map((member, i) => (
                            <AnimatedCard key={i} delay={i * 0.08}>
                                <div className="card" style={{ padding: 28, textAlign: 'center' }}>
                                    <div style={{
                                        width: 72, height: 72, borderRadius: '50%', margin: '0 auto 16px',
                                        background: `linear-gradient(135deg,${member.color},${member.color}88)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontWeight: 800, fontSize: 22,
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>{member.initials}</div>
                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>{member.name}</h3>
                                    <p style={{ fontSize: 12, color: '#26b8a0', fontWeight: 600, marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>{member.role}</p>
                                    <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, fontFamily: "'Poppins', sans-serif" }}>{member.bio}</p>
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
                <style>{`
          @media (max-width: 900px) { .team-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 480px) { .team-grid { grid-template-columns: 1fr !important; } }
        `}</style>
            </section>

            {/* ── TRUSTED ORGANISATIONS ── */}
            <section className="section" style={{ background: '#f5fbfa' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <SectionHeader chip="Trusted By" title="Organisations that rely on SanaMind" center />
                    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center', marginTop: 48 }}>
                        {ORGS.map((org, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                background: 'white', border: '1px solid #cce8e3', borderRadius: 16,
                                padding: '16px 24px',
                                boxShadow: '0 2px 12px rgba(11,31,58,0.06)',
                            }}>
                                <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg,${org.color},${org.color}88)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 11, fontFamily: "'Poppins', sans-serif" }}>{org.initials}</div>
                                <span style={{ fontSize: 14, fontWeight: 600, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{org.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section style={{ background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', padding: '80px 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                        Become part of the SanaMind community
                    </h2>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.75)', marginBottom: 36, fontFamily: "'Poppins', sans-serif" }}>
                        Whether you need support or you provide it — there is a place for you here.
                    </p>
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn btn-white btn-lg" onClick={() => navigate('signup')} style={{ fontFamily: "'Poppins', sans-serif" }}>Join as a Patient</button>
                        <button className="btn btn-outline-white btn-lg" onClick={() => navigate('signup')} style={{ fontFamily: "'Poppins', sans-serif" }}>Join as a Doctor</button>
                    </div>
                </div>
            </section>
        </div>
    );
}