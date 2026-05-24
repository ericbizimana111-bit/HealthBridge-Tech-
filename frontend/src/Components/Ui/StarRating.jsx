import React, { useState } from 'react';

/* ─────────────────────────────────────────────
   StarRating
   Displays a star rating. Can be interactive
   (for submitting reviews) or read-only.

   Props:
     value      – current rating (0–5)
     onChange   – function(newValue) — omit for read-only
     size       – star size in px (default 18)
     showValue  – show numeric value beside stars
     total      – total review count (optional)
───────────────────────────────────────────── */

export default function StarRating({
    value = 0,
    onChange,
    size = 18,
    showValue = false,
    total,
}) {
    const [hovered, setHovered] = useState(0);
    const interactive = typeof onChange === 'function';
    const display = hovered || value;

    return (
        <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontFamily: "'Poppins', sans-serif",
        }}>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    onClick={() => interactive && onChange(star)}
                    onMouseEnter={() => interactive && setHovered(star)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    style={{
                        fontSize: size,
                        color: star <= display ? '#f5a623' : '#d8e5ee',
                        cursor: interactive ? 'pointer' : 'default',
                        transition: 'color 0.15s, transform 0.15s',
                        transform: interactive && hovered === star ? 'scale(1.2)' : 'scale(1)',
                        display: 'inline-block',
                    }}
                >★</span>
            ))}
            {showValue && (
                <span style={{
                    fontSize: size * 0.78,
                    fontWeight: 700,
                    color: '#0b1f3a',
                    marginLeft: 4,
                    fontFamily: "'Poppins', sans-serif",
                }}>{value.toFixed(1)}</span>
            )}
            {total !== undefined && (
                <span style={{
                    fontSize: size * 0.72,
                    color: '#7a96b4',
                    fontFamily: "'Poppins', sans-serif",
                }}>({total.toLocaleString()})</span>
            )}
        </div>
    );
}