import { useState } from 'react';

const ROLES = [
    { key: 'patient', label: 'Patient / User', icon: '🙋', desc: 'I\'m looking for health support and professional guidance.' },
    { key: 'doctor', label: 'Doctor', icon: '👨‍⚕️', desc: 'I\'m a licensed medical professional offering consultations.' },
    { key: 'counselor', label: 'Counselor / Therapist', icon: '🧑‍💼', desc: 'I provide mental health therapy and emotional support.' },
    { key: 'healthcare', label: 'Healthcare Professional', icon: '🏥', desc: 'I work in healthcare in another professional capacity.' },
];

export default function SignupPage({ navigate, onLogin }) {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState(null);
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        specialization: '', bio: '', location: '', experience: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const validateStep2 = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required.';
        if (!form.email.includes('@')) e.email = 'Valid email required.';
        if (form.password.length < 8) e.password = 'Password must be at least 8 characters.';
        if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && !role) return;
        if (step === 2 && !validateStep2()) return;
        if (step < 3) { setStep(s => s + 1); return; }
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin({ name: form.name, email: form.email, initials: form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(), role });
        }, 1000);
    };

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => setPhotoPreview(ev.target.result);
            reader.readAsDataURL(file);
        }
    };

    const isDoctor = role && role !== 'patient';

    return (
        <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Poppins', sans-serif", background: '#f5fbfa', paddingTop: 70 }}>
            {/* Left */}
            <div style={{ flex: 1, background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '60px 48px', position: 'relative', overflow: 'hidden' }} className="auth-left">
                <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(38,184,160,0.1) 0%,transparent 70%)' }} />
                <div style={{ textAlign: 'center', maxWidth: 400, position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 64, marginBottom: 20 }}>🌿</div>
                    <h2 style={{ fontSize: 30, fontWeight: 800, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                        Join <span style={{ color: '#26b8a0' }}>SanaMind</span>
                    </h2>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36, fontFamily: "'Poppins', sans-serif" }}>
                        Thousands of people have taken this first step. You're making a brave, wise choice.
                    </p>

                    {/* Step indicator */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 36 }}>
                        {['Choose Role', 'Your Details', 'Profile Setup'].map((label, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: '50%',
                                    background: step > i + 1 ? '#26b8a0' : step === i + 1 ? 'white' : 'rgba(255,255,255,0.15)',
                                    color: step === i + 1 ? '#0b1f3a' : step > i + 1 ? 'white' : 'rgba(255,255,255,0.4)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontWeight: 700, fontSize: 13, transition: 'all 0.3s',
                                    fontFamily: "'Poppins', sans-serif",
                                }}>{step > i + 1 ? '✓' : i + 1}</div>
                                <span style={{ fontSize: 10, color: step === i + 1 ? 'white' : 'rgba(255,255,255,0.4)', fontFamily: "'Poppins', sans-serif" }}>{label}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ background: 'rgba(38,184,160,0.12)', border: '1px solid rgba(38,184,160,0.25)', borderRadius: 14, padding: '18px 20px' }}>
                        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                            "The moment you reach out is the moment healing can begin."
                        </p>
                    </div>
                </div>
            </div>

            {/* Right */}
            <div style={{ width: 520, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 48px', background: 'white', boxShadow: '-8px 0 40px rgba(11,31,58,0.06)', overflowY: 'auto' }} className="auth-right">
                <div style={{ width: '100%', maxWidth: 420 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🧠</div>
                        <span style={{ fontSize: 18, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Sana<span style={{ color: '#26b8a0' }}>Mind</span></span>
                    </div>

                    {/* ── STEP 1: ROLE ── */}
                    {step === 1 && (
                        <>
                            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>I am joining as a…</h1>
                            <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>Choose the role that best describes you.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                                {ROLES.map(r => (
                                    <button key={r.key} onClick={() => setRole(r.key)} style={{
                                        padding: '16px 18px', borderRadius: 14,
                                        border: `2px solid ${role === r.key ? '#26b8a0' : '#cce8e3'}`,
                                        background: role === r.key ? '#e6f8f5' : 'white',
                                        cursor: 'pointer', display: 'flex', gap: 14, alignItems: 'center',
                                        transition: 'all 0.18s', textAlign: 'left',
                                        fontFamily: "'Poppins', sans-serif",
                                    }}>
                                        <span style={{ fontSize: 28, flexShrink: 0 }}>{r.icon}</span>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{r.label}</p>
                                            <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>{r.desc}</p>
                                        </div>
                                        {role === r.key && <span style={{ marginLeft: 'auto', color: '#26b8a0', fontSize: 18 }}>✓</span>}
                                    </button>
                                ))}
                            </div>
                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: role ? 1 : 0.4, fontFamily: "'Poppins', sans-serif" }} onClick={handleNext} disabled={!role}>
                                Continue
                            </button>
                            <p style={{ textAlign: 'center', fontSize: 13, color: '#7a96b4', marginTop: 16, fontFamily: "'Poppins', sans-serif" }}>
                                Already have an account?{' '}
                                <button onClick={() => navigate('login')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#26b8a0', fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>Log in</button>
                            </p>
                        </>
                    )}

                    {/* ── STEP 2: DETAILS ── */}
                    {step === 2 && (
                        <>
                            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>Your details</h1>
                            <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>All information is private and encrypted.</p>

                            {[
                                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Dr. Jane Smith' },
                                { key: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com' },
                                { key: 'password', label: 'Password', type: 'password', placeholder: 'Min. 8 characters' },
                                { key: 'confirmPassword', label: 'Confirm Password', type: 'password', placeholder: 'Repeat your password' },
                            ].map(field => (
                                <div key={field.key} style={{ marginBottom: 14 }}>
                                    <label className="form-label">{field.label}</label>
                                    <input
                                        className="form-input"
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        value={form[field.key]}
                                        onChange={e => set(field.key, e.target.value)}
                                        style={{ borderColor: errors[field.key] ? '#e57373' : undefined, fontFamily: "'Poppins', sans-serif" }}
                                    />
                                    {errors[field.key] && <p style={{ fontSize: 12, color: '#e57373', marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>{errors[field.key]}</p>}
                                </div>
                            ))}

                            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                                <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => setStep(1)}>Back</button>
                                <button className="btn btn-primary btn-sm" style={{ flex: 2, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={handleNext}>Continue</button>
                            </div>
                        </>
                    )}

                    {/* ── STEP 3: PROFILE ── */}
                    {step === 3 && (
                        <>
                            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>Complete your profile</h1>
                            <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 24, fontFamily: "'Poppins', sans-serif" }}>This helps us personalise your experience.</p>

                            {/* Photo upload */}
                            <div style={{ marginBottom: 20, textAlign: 'center' }}>
                                <div style={{ position: 'relative', display: 'inline-block' }}>
                                    <div style={{
                                        width: 80, height: 80, borderRadius: '50%',
                                        background: photoPreview ? 'transparent' : 'linear-gradient(135deg,#26b8a0,#0b1f3a)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: photoPreview ? 0 : 32, overflow: 'hidden',
                                        border: '3px solid #cce8e3', margin: '0 auto 8px',
                                    }}>
                                        {photoPreview ? <img src={photoPreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
                                    </div>
                                    <label style={{
                                        position: 'absolute', bottom: 8, right: -4,
                                        width: 28, height: 28, borderRadius: '50%',
                                        background: '#26b8a0', border: '2px solid white',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: 'pointer', fontSize: 13,
                                    }}>
                                        📷
                                        <input type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
                                    </label>
                                </div>
                                <p style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>Upload profile photo (optional)</p>
                            </div>

                            {isDoctor && (
                                <div style={{ marginBottom: 14 }}>
                                    <label className="form-label">Specialization</label>
                                    <input className="form-input" placeholder="e.g. Mental Health, Family Therapy" value={form.specialization} onChange={e => set('specialization', e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }} />
                                </div>
                            )}

                            <div style={{ marginBottom: 14 }}>
                                <label className="form-label">Location</label>
                                <input className="form-input" placeholder="City, Country" value={form.location} onChange={e => set('location', e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }} />
                            </div>

                            {isDoctor && (
                                <div style={{ marginBottom: 14 }}>
                                    <label className="form-label">Years of Experience</label>
                                    <input className="form-input" placeholder="e.g. 8 years" value={form.experience} onChange={e => set('experience', e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }} />
                                </div>
                            )}

                            <div style={{ marginBottom: 20 }}>
                                <label className="form-label">{isDoctor ? 'Professional Bio' : 'About You (optional)'}</label>
                                <textarea
                                    rows={3}
                                    className="form-input"
                                    placeholder={isDoctor ? 'Share your expertise and approach to care…' : 'Tell us a little about yourself and what brings you here…'}
                                    value={form.bio}
                                    onChange={e => set('bio', e.target.value)}
                                    style={{ resize: 'vertical', fontFamily: "'Poppins', sans-serif" }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 10 }}>
                                <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center', fontFamily: "'Poppins', sans-serif" }} onClick={() => setStep(2)}>Back</button>
                                <button className="btn btn-primary btn-sm" style={{ flex: 2, justifyContent: 'center', opacity: loading ? 0.7 : 1, fontFamily: "'Poppins', sans-serif" }} onClick={handleNext} disabled={loading}>
                                    {loading ? 'Creating account…' : 'Create Account'}
                                </button>
                            </div>

                            <p style={{ fontSize: 11, color: '#7a96b4', textAlign: 'center', marginTop: 14, lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" }}>
                                By creating an account you agree to our Terms of Service and Privacy Policy. Your data is encrypted and never sold.
                            </p>
                        </>
                    )}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
          .auth-right { width: 100% !important; padding: 32px 20px !important; }
        }
      `}</style>
        </div>
    );
}
