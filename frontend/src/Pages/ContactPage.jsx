import React, { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';

/* ─────────────────────────────────────────────
   ContactPage
   - Contact form with subject categories
   - Support channels (email, chat, phone)
   - Office locations
   - Emergency resources
───────────────────────────────────────────── */

const SUBJECTS = [
    'General enquiry',
    'Technical support',
    'Billing & payments',
    'Doctor application',
    'Partnership / organisations',
    'Press & media',
    'Report a concern',
];

const CHANNELS = [
    { icon: '💬', title: 'Live Chat', desc: 'Chat with our support team directly in the app.', cta: 'Start Chat', available: 'Available 24 / 7' },
    { icon: '📧', title: 'Email Support', desc: 'We respond to every email within 12 hours.', cta: 'Send Email', available: 'support@sanamind.com' },
    { icon: '📞', title: 'Phone Support', desc: 'Speak to a real person for urgent matters.', cta: 'Call Us', available: 'Mon – Fri, 8 AM – 8 PM' },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.message) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1100);
    };

    return (
        <div style={{ paddingTop: 70, fontFamily: "'Poppins', sans-serif" }}>

            {/* Hero */}
            <div style={{ background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', padding: '72px 0 56px' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <span className="label-chip" style={{ background: 'rgba(38,184,160,0.2)', color: '#9de4d8' }}>Get In Touch</span>
                    <h1 style={{ fontSize: 'clamp(28px,4vw,46px)', fontWeight: 800, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                        We Are Here to Help
                    </h1>
                    <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 500, margin: '0 auto', fontFamily: "'Poppins', sans-serif" }}>
                        Whether it's a question, a concern, or a partnership — our team responds to every message personally.
                    </p>
                </div>
            </div>

            {/* Support channels */}
            <div style={{ background: '#f5fbfa', padding: '48px 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }} className="channels-grid">
                        {CHANNELS.map((ch, i) => (
                            <div key={i} className="card" style={{ padding: 28, textAlign: 'center' }}>
                                <div style={{ fontSize: 40, marginBottom: 14 }}>{ch.icon}</div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>{ch.title}</h3>
                                <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>{ch.desc}</p>
                                <p style={{ fontSize: 11, color: '#26b8a0', fontWeight: 600, marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>{ch.available}</p>
                                <button className="btn btn-ghost btn-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>{ch.cta}</button>
                            </div>
                        ))}
                    </div>
                </div>
                <style>{`@media (max-width: 768px) { .channels-grid { grid-template-columns: 1fr !important; } }`}</style>
            </div>

            {/* Contact form + info */}
            <section className="section">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 64, alignItems: 'start' }} className="contact-grid">

                        {/* Form */}
                        <div>
                            <SectionHeader chip="Contact Us" title="Send us a message" subtitle="Fill in the form and we'll get back to you within 12 hours." />
                            <div style={{ marginTop: 36 }}>
                                {submitted ? (
                                    <div style={{ background: '#e6f8f5', borderRadius: 20, padding: '48px 32px', textAlign: 'center' }}>
                                        <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                                        <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>Message Sent!</h3>
                                        <p style={{ color: '#2c4a5e', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>
                                            Thank you, <strong style={{ fontFamily: "'Poppins', sans-serif" }}>{form.name}</strong>. We'll reply to <strong style={{ fontFamily: "'Poppins', sans-serif" }}>{form.email}</strong> within 12 hours.
                                        </p>
                                        <button className="btn btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' }); }} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                            Send Another
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{ background: 'white', borderRadius: 20, padding: 36, border: '1px solid #cce8e3' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                                            <div>
                                                <label className="form-label">Full Name</label>
                                                <input className="form-input" placeholder="Your name" value={form.name} onChange={e => set('name', e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }} />
                                            </div>
                                            <div>
                                                <label className="form-label">Email Address</label>
                                                <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }} />
                                            </div>
                                        </div>
                                        <div style={{ marginBottom: 16 }}>
                                            <label className="form-label">Subject</label>
                                            <select className="form-input" value={form.subject} onChange={e => set('subject', e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }}>
                                                {SUBJECTS.map(s => <option key={s} style={{ fontFamily: "'Poppins', sans-serif" }}>{s}</option>)}
                                            </select>
                                        </div>
                                        <div style={{ marginBottom: 24 }}>
                                            <label className="form-label">Message</label>
                                            <textarea
                                                rows={6}
                                                className="form-input"
                                                placeholder="Tell us how we can help…"
                                                value={form.message}
                                                onChange={e => set('message', e.target.value)}
                                                style={{ resize: 'vertical', fontFamily: "'Poppins', sans-serif" }}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-primary"
                                            style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1, fontFamily: "'Poppins', sans-serif" }}
                                            onClick={handleSubmit}
                                            disabled={loading}
                                        >
                                            {loading ? 'Sending…' : 'Send Message'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {/* Offices */}
                            <div className="card" style={{ padding: 28 }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 18, fontFamily: "'Poppins', sans-serif" }}>Our Offices</h4>
                                {[
                                    { city: 'Kigali', country: 'Rwanda', flag: '🇷🇼', address: 'KG 7 Ave, Gasabo District' },
                                    { city: 'Nairobi', country: 'Kenya', flag: '🇰🇪', address: 'Westlands, Nairobi 00100' },
                                    { city: 'London', country: 'United Kingdom', flag: '🇬🇧', address: '1 Canada Square, E14 5AB' },
                                ].map((office, i) => (
                                    <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 0', borderBottom: i < 2 ? '1px solid #f0f7f6' : 'none' }}>
                                        <span style={{ fontSize: 22, flexShrink: 0 }}>{office.flag}</span>
                                        <div>
                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{office.city}, {office.country}</p>
                                            <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{office.address}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Emergency */}
                            <div style={{ background: 'linear-gradient(135deg,#fff5e6,#fde8d4)', borderRadius: 18, padding: 24, border: '1px solid #f4c896' }}>
                                <h4 style={{ fontSize: 15, fontWeight: 700, color: '#0b1f3a', marginBottom: 10, fontFamily: "'Poppins', sans-serif" }}>
                                    🚨 In Crisis?
                                </h4>
                                <p style={{ fontSize: 13, color: '#2c4a5e', lineHeight: 1.65, marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                                    If you or someone you know is in immediate danger, please contact your local emergency services or a crisis line.
                                </p>
                                {[
                                    { label: 'International', val: '+1-800-273-8255' },
                                    { label: 'Rwanda', val: '912 / 051' },
                                    { label: 'Kenya', val: '0800 720 999' },
                                ].map(r => (
                                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(244,160,74,0.2)' }}>
                                        <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{r.label}</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{r.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Response time */}
                            <div style={{ background: '#e6f8f5', borderRadius: 18, padding: 24 }}>
                                <p style={{ fontSize: 14, fontWeight: 700, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>⚡ Response Times</p>
                                {[
                                    { label: 'Live chat', val: 'Under 2 minutes' },
                                    { label: 'Email', val: 'Within 12 hours' },
                                    { label: 'Phone', val: 'Mon–Fri 8AM–8PM' },
                                ].map(r => (
                                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(38,184,160,0.15)' }}>
                                        <span style={{ fontSize: 12, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>{r.label}</span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{r.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <style>{`@media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>
        </div>
    );
}