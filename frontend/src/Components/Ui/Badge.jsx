import React from 'react';

/* ─────────────────────────────────────────────
   Badge
   A small pill-shaped label used for statuses,
   categories, and tags throughout the platform.

   Props:
     variant – 'available' | 'busy' | 'in-session' | 'offline'
               | 'teal' | 'navy' | 'gray' | 'purple' | 'orange'
     size    – 'sm' | 'md' (default)
     dot     – show status dot before text (boolean)
     children
───────────────────────────────────────────── */

const VARIANTS = {
    available: { bg: '#d4f5ee', color: '#0a7a60' },
    busy: { bg: '#fde8d4', color: '#9a4a10' },
    'in-session': { bg: '#e4e8ff', color: '#3040b0' },
    offline: { bg: '#ebebeb', color: '#666666' },
    teal: { bg: '#e6f8f5', color: '#0a7060' },
    navy: { bg: '#e0e8f5', color: '#0b1f3a' },
    gray: { bg: '#f0f0f0', color: '#555555' },
    purple: { bg: '#f0e8ff', color: '#5c30aa' },
    orange: { bg: '#fff3e0', color: '#a05a00' },
    green: { bg: '#e8f5e0', color: '#2a6a20' },
};

export default function Badge({ variant = 'teal', size = 'md', dot = false, children, style = {} }) {
    const { bg, color } = VARIANTS[variant] || VARIANTS.teal;
    const padding = size === 'sm' ? '3px 9px' : '4px 12px';
    const fontSize = size === 'sm' ? 10 : 12;

    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            background: bg,
            color,
            fontSize,
            fontWeight: 700,
            fontFamily: "'Poppins', sans-serif",
            padding,
            borderRadius: 50,
            letterSpacing: '0.2px',
            whiteSpace: 'nowrap',
            ...style,
        }}>
            {dot && (
                <span style={{
                    width: 6, height: 6,
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                }} />
            )}
            {children}
        </span>
    );
}