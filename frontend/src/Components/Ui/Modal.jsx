import React, { useEffect } from 'react';

/* ─────────────────────────────────────────────
   Modal
   Accessible, animated modal overlay.
   Closes on backdrop click or Escape key.

   Props:
     open      – boolean
     onClose   – function
     title     – string (optional)
     maxWidth  – number px (default 480)
     children
───────────────────────────────────────────── */

export default function Modal({ open, onClose, title, maxWidth = 480, children }) {
    // Close on Escape key
    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    if (!open) return null;

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(11,31,58,0.52)',
                backdropFilter: 'blur(5px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2000, padding: 24,
                animation: 'fadeIn 0.2s ease both',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            <div style={{
                background: 'white',
                borderRadius: 24,
                width: '100%',
                maxWidth,
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 24px 64px rgba(11,31,58,0.22)',
                animation: 'fadeUp 0.28s cubic-bezier(0.4,0,0.2,1) both',
                fontFamily: "'Poppins', sans-serif",
            }}>
                {/* Header */}
                {title && (
                    <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '22px 28px 0',
                    }}>
                        <h2 style={{
                            fontSize: 18, fontWeight: 700, color: '#0b1f3a',
                            fontFamily: "'Poppins', sans-serif",
                        }}>{title}</h2>
                        <button
                            onClick={onClose}
                            style={{
                                width: 32, height: 32, borderRadius: '50%',
                                background: '#f0f7f6', border: 'none', cursor: 'pointer',
                                fontSize: 16, color: '#7a96b4',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'background 0.18s',
                                fontFamily: "'Poppins', sans-serif",
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = '#e6f8f5'}
                            onMouseLeave={e => e.currentTarget.style.background = '#f0f7f6'}
                        >✕</button>
                    </div>
                )}

                {/* Body */}
                <div style={{ padding: title ? '20px 28px 28px' : '28px' }}>
                    {children}
                </div>
            </div>
        </div>
    );
}