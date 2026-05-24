import React from 'react';

/* ─────────────────────────────────────────────
   LoadingSpinner
   Elegant animated spinner in SanaMind brand
   colours. Used for async loading states.

   Props:
     size    – px (default 36)
     color   – stroke colour (default teal)
     full    – fill entire parent container
     label   – optional loading text below
───────────────────────────────────────────── */

export default function LoadingSpinner({
    size = 36,
    color = '#26b8a0',
    full = false,
    label,
}) {
    const spinner = (
        <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 12,
            fontFamily: "'Poppins', sans-serif",
        }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 36 36"
                fill="none"
                style={{ animation: 'spin 0.85s linear infinite' }}
            >
                <circle cx="18" cy="18" r="14" stroke="#e6f8f5" strokeWidth="3" />
                <path
                    d="M18 4 A14 14 0 0 1 32 18"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
            {label && (
                <p style={{
                    fontSize: 13,
                    color: '#7a96b4',
                    fontFamily: "'Poppins', sans-serif",
                }}>{label}</p>
            )}
        </div>
    );

    if (full) {
        return (
            <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255,255,255,0.85)',
                borderRadius: 'inherit',
                zIndex: 10,
            }}>
                {spinner}
            </div>
        );
    }

    return spinner;
}