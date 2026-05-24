import React from 'react';

/* ─────────────────────────────────────────────
   Avatar
   Displays a user or doctor avatar.
   Falls back to coloured initials if no image.

   Props:
     src       – image URL (optional)
     initials  – fallback text e.g. "AN"
     size      – number in px (default 44)
     color     – background hex for initials fallback
     status    – 'available' | 'busy' | 'in-session' | 'offline' (optional)
     style     – extra inline styles
───────────────────────────────────────────── */

const STATUS_COLORS = {
    available: '#26b8a0',
    busy: '#f4a04a',
    'in-session': '#6070e0',
    offline: '#aaaaaa',
};

export default function Avatar({
    src,
    initials = '?',
    size = 44,
    color = '#26b8a0',
    status,
    style = {},
}) {
    const dotSize = Math.max(10, Math.floor(size * 0.22));

    return (
        <div style={{ position: 'relative', width: size, height: size, flexShrink: 0, ...style }}>
            {/* Image or initials */}
            <div style={{
                width: size, height: size,
                borderRadius: '50%',
                overflow: 'hidden',
                background: src ? 'transparent' : `linear-gradient(135deg, ${color}, ${color}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white',
                fontWeight: 700,
                fontSize: Math.floor(size * 0.34),
                fontFamily: "'Poppins', sans-serif",
                userSelect: 'none',
            }}>
                {src
                    ? <img src={src} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : initials
                }
            </div>

            {/* Online status dot */}
            {status && (
                <span style={{
                    position: 'absolute',
                    bottom: 0, right: 0,
                    width: dotSize, height: dotSize,
                    borderRadius: '50%',
                    background: STATUS_COLORS[status] || STATUS_COLORS.offline,
                    border: `${Math.max(2, Math.floor(dotSize * 0.25))}px solid white`,
                }} />
            )}
        </div>
    );
}