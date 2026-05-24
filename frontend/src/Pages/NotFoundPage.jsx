import React from 'react';

export default function NotFoundPage({ navigate }) {
    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'linear-gradient(145deg,#0b1f3a,#1e3f6e)',
            padding: 32, fontFamily: "'Poppins', sans-serif",
        }}>
            <div style={{ textAlign: 'center', maxWidth: 480 }}>
                <div style={{ fontSize: 80, marginBottom: 12, animation: 'bounce 2s ease-in-out infinite' }}>🌿</div>
                <h1 style={{ fontSize: 80, fontWeight: 800, color: '#26b8a0', lineHeight: 1, marginBottom: 8, fontFamily: "'Poppins', sans-serif" }}>404</h1>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: 'white', marginBottom: 14, fontFamily: "'Poppins', sans-serif" }}>
                    Page Not Found
                </h2>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36, fontFamily: "'Poppins', sans-serif" }}>
                    The page you're looking for doesn't exist — but your wellbeing journey does. Let us take you somewhere helpful.
                </p>
                <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary btn-lg" onClick={() => navigate('home')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Go Home
                    </button>
                    <button className="btn btn-outline-white btn-lg" onClick={() => navigate('doctors')} style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Find a Doctor
                    </button>
                </div>
            </div>
        </div>
    );
}