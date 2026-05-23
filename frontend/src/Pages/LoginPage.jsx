import React, { useState } from 'react';

export default function LoginPage({ navigate, onLogin }) {
    const [step, setStep] = useState('login'); // login | otp | forgot
    const [form, setForm] = useState({ email: '', password: '', remember: false });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotSent, setForgotSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const otpRefs = Array.from({ length: 6 }, () => React.createRef());

    const validate = () => {
        const e = {};
        if (!form.email.includes('@')) e.email = 'Please enter a valid email address.';
        if (form.password.length < 6) e.password = 'Password must be at least 6 characters.';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleLogin = () => {
        if (!validate()) return;
        setLoading(true);
        setTimeout(() => { setLoading(false); setStep('otp'); }, 1000);
    };

    const handleOtp = () => {
        const code = otp.join('');
        if (code.length < 6) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            onLogin({ name: 'Alex Johnson', email: form.email, initials: 'AJ', role: 'patient' });
        }, 900);
    };

    const handleOtpKey = (i, e) => {
        const val = e.target.value.replace(/\D/, '');
        const next = [...otp]; next[i] = val;
        setOtp(next);
        if (val && i < 5) otpRefs[i + 1].current?.focus();
        if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs[i - 1].current?.focus();
    };

    const messages = [
        '"Asking for help is not weakness — it is wisdom."',
        '"Healing is not linear, but every step counts."',
        '"You deserve support, care, and peace of mind."',
    ];
    const [msgIdx] = useState(() => Math.floor(Math.random() * messages.length));


    return (
        <div style={{
            minHeight: '100vh', display: 'flex', fontFamily: "'Poppins', sans-serif",
            background: '#f5fbfa', paddingTop: 70,
        }}>
            {/* Left panel */}
            <div style={{
                flex: 1, background: 'linear-gradient(145deg,#0b1f3a 0%,#1e3f6e 100%)',
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'center', padding: '60px 48px', position: 'relative', overflow: 'hidden',
            }} className="auth-left">
                <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(38,184,160,0.12) 0%,transparent 70%)' }} />
                <div style={{ position: 'absolute', bottom: -120, left: -60, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(38,184,160,0.08) 0%,transparent 70%)' }} />

                <div style={{ textAlign: 'center', maxWidth: 420, position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: 64, marginBottom: 24 }}>🧠</div>
                    <h2 style={{ fontSize: 32, fontWeight: 800, color: 'white', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}>
                        Welcome Back to<br /><span style={{ color: '#26b8a0' }}>SanaMind</span>
                    </h2>
                    <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 40, fontFamily: "'Poppins', sans-serif" }}>
                        Your trusted space for mental health, wellness, and professional care — all in one place.
                    </p>
                    <div style={{
                        background: 'rgba(38,184,160,0.12)', border: '1px solid rgba(38,184,160,0.25)',
                        borderRadius: 16, padding: '20px 24px',
                    }}>
                        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, fontStyle: 'italic', fontFamily: "'Poppins', sans-serif" }}>
                            {messages[msgIdx]}
                        </p>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 40 }}>
                        {[['12,000+', 'Patients'], ['600+', 'Doctors'], ['98%', 'Satisfaction']].map(([val, lbl]) => (
                            <div key={lbl} style={{ textAlign: 'center' }}>
                                <p style={{ fontSize: 22, fontWeight: 800, color: '#26b8a0', fontFamily: "'Poppins', sans-serif" }}>{val}</p>
                                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: "'Poppins', sans-serif" }}>{lbl}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div style={{
                width: 500, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '48px 48px', background: 'white',
                boxShadow: '-8px 0 40px rgba(11,31,58,0.06)',
            }} className="auth-right">
                <div style={{ width: '100%', maxWidth: 400 }}>

                    {/* Logo */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg,#26b8a0,#0b1f3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🧠</div>
                        <span style={{ fontSize: 20, fontWeight: 700, color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>Sana<span style={{ color: '#26b8a0' }}>Mind</span></span>
                    </div>

                    {/* ── LOGIN STEP ── */}
                    {step === 'login' && (
                        <>
                            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0b1f3a', marginBottom: 6, fontFamily: "'Poppins', sans-serif" }}>Log in to your account</h1>
                            <p style={{ fontSize: 14, color: '#7a96b4', marginBottom: 28, fontFamily: "'Poppins', sans-serif" }}>Welcome back. Please enter your details.</p>

                            {/* Google */}
                            <button style={{
                                width: '100%', padding: '13px 18px',
                                border: '1.5px solid #cce8e3', borderRadius: 12,
                                background: 'white', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                fontSize: 14, fontWeight: 600, color: '#0b1f3a',
                                transition: 'all 0.2s', marginBottom: 20,
                                fontFamily: "'Poppins', sans-serif",
                            }}
                                onMouseEnter={e => { e.currentTarget.style.background = '#f5fbfa'; e.currentTarget.style.borderColor = '#26b8a0'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#cce8e3'; }}
                            >
                                <span style={{ fontSize: 18 }}>G</span> Continue with Google
                            </button>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                                <div style={{ flex: 1, height: 1, background: '#e8f5f2' }} />
                                <span style={{ fontSize: 12, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>or continue with email</span>
                                <div style={{ flex: 1, height: 1, background: '#e8f5f2' }} />
                            </div>

                            {/* Email */}
                            <div style={{ marginBottom: 16 }}>
                                <label className="form-label">Email address</label>
                                <input
                                    className="form-input"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                    style={{ borderColor: errors.email ? '#e57373' : undefined, fontFamily: "'Poppins', sans-serif" }}
                                />
                                {errors.email && <p style={{ fontSize: 12, color: '#e57373', marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: 12 }}>
                                <label className="form-label">Password</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                    style={{ borderColor: errors.password ? '#e57373' : undefined, fontFamily: "'Poppins', sans-serif" }}
                                />
                                {errors.password && <p style={{ fontSize: 12, color: '#e57373', marginTop: 4, fontFamily: "'Poppins', sans-serif" }}>{errors.password}</p>}
                            </div>

                            {/* Remember & forgot */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer', fontSize: 13, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>
                                    <input type="checkbox" checked={form.remember} onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))} style={{ accentColor: '#26b8a0' }} />
                                    Remember me
                                </label>
                                <button onClick={() => setStep('forgot')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#26b8a0', fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
                                    Forgot password?
                                </button>
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1, fontFamily: "'Poppins', sans-serif" }}
                                onClick={handleLogin}
                                disabled={loading}
                            >
                                {loading ? 'Signing you in…' : 'Log In'}
                            </button>

                            <p style={{ textAlign: 'center', fontSize: 13, color: '#7a96b4', marginTop: 20, fontFamily: "'Poppins', sans-serif" }}>
                                Don't have an account?{' '}
                                <button onClick={() => navigate('signup')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#26b8a0', fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>
                                    Sign up free
                                </button>
                            </p>
                        </>
                    )}

                    {/* ── OTP STEP ── */}
                    {step === 'otp' && (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                                <div style={{ fontSize: 48, marginBottom: 14 }}>📧</div>
                                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Check your email</h1>
                                <p style={{ fontSize: 14, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>
                                    We sent a 6-digit verification code to<br />
                                    <strong style={{ color: '#0b1f3a', fontFamily: "'Poppins', sans-serif" }}>{form.email}</strong>
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 28 }}>
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        ref={otpRefs[i]}
                                        maxLength={1}
                                        value={digit}
                                        onChange={e => handleOtpKey(i, e)}
                                        onKeyDown={e => handleOtpKey(i, e)}
                                        style={{
                                            width: 48, height: 56,
                                            textAlign: 'center', fontSize: 22, fontWeight: 700,
                                            border: `2px solid ${digit ? '#26b8a0' : '#cce8e3'}`,
                                            borderRadius: 12, background: digit ? '#e6f8f5' : 'white',
                                            color: '#0b1f3a', transition: 'all 0.18s',
                                            fontFamily: "'Poppins', sans-serif",
                                        }}
                                    />
                                ))}
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1, marginBottom: 16, fontFamily: "'Poppins', sans-serif" }}
                                onClick={handleOtp}
                                disabled={loading || otp.join('').length < 6}
                            >
                                {loading ? 'Verifying…' : 'Verify & Log In'}
                            </button>

                            <p style={{ textAlign: 'center', fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>
                                Didn't receive the code?{' '}
                                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#26b8a0', fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>
                                    Resend
                                </button>
                            </p>
                            <button onClick={() => setStep('login')} style={{ display: 'block', margin: '12px auto 0', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>
                                ← Back to login
                            </button>
                        </>
                    )}

                    {/* ── FORGOT STEP ── */}
                    {step === 'forgot' && (
                        <>
                            <div style={{ textAlign: 'center', marginBottom: 28 }}>
                                <div style={{ fontSize: 48, marginBottom: 14 }}>🔒</div>
                                <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0b1f3a', marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>Reset your password</h1>
                                <p style={{ fontSize: 14, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>Enter your email and we'll send you a reset link.</p>
                            </div>

                            {forgotSent ? (
                                <div style={{ background: '#e6f8f5', borderRadius: 14, padding: 24, textAlign: 'center', marginBottom: 20 }}>
                                    <p style={{ fontSize: 24, marginBottom: 8 }}>✅</p>
                                    <p style={{ fontSize: 14, color: '#0b1f3a', fontWeight: 600, marginBottom: 4, fontFamily: "'Poppins', sans-serif" }}>Reset link sent!</p>
                                    <p style={{ fontSize: 13, color: '#2c4a5e', fontFamily: "'Poppins', sans-serif" }}>Check your inbox at <strong style={{ fontFamily: "'Poppins', sans-serif" }}>{forgotEmail}</strong></p>
                                </div>
                            ) : (
                                <>
                                    <div style={{ marginBottom: 20 }}>
                                        <label className="form-label">Email address</label>
                                        <input className="form-input" type="email" placeholder="you@example.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} style={{ fontFamily: "'Poppins', sans-serif" }} />
                                    </div>
                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 16, fontFamily: "'Poppins', sans-serif" }} onClick={() => setForgotSent(true)}>
                                        Send Reset Link
                                    </button>
                                </>
                            )}

                            <button onClick={() => setStep('login')} style={{ display: 'block', margin: '0 auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#7a96b4', fontFamily: "'Poppins', sans-serif" }}>
                                ← Back to login
                            </button>
                        </>
                    )}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .auth-left { display: none !important; }
          .auth-right { width: 100% !important; padding: 32px 24px !important; }
        }
      `}</style>
        </div>
    );
}
