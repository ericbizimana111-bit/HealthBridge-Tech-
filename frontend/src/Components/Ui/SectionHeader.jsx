import React from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

/* ─────────────────────────────────────────────
   SectionHeader
   Consistent label chip + title + subtitle
   used at the top of every major section.
   Animates in when it enters the viewport.

   Props:
     chip      – small label text (e.g. "Our Doctors")
     title     – main heading
     subtitle  – paragraph below heading
     center    – boolean (default false)
     light     – white text variant for dark backgrounds
───────────────────────────────────────────── */

export default function SectionHeader({
    chip,
    title,
    subtitle,
    center = false,
    light = false,
}) {
    const [ref, visible] = useScrollAnimation(0.2);

    return (
        <div
            ref={ref}
            style={{
                textAlign: center ? 'center' : 'left',
                maxWidth: center ? 620 : '100%',
                margin: center ? '0 auto' : undefined,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'opacity 0.55s ease, transform 0.55s ease',
                fontFamily: "'Poppins', sans-serif",
            }}
        >
            {chip && (
                <span style={{
                    display: 'inline-block',
                    background: light ? 'rgba(38,184,160,0.2)' : '#e6f8f5',
                    color: light ? '#9de4d8' : '#26b8a0',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                    padding: '5px 16px',
                    borderRadius: 50,
                    marginBottom: 14,
                    fontFamily: "'Poppins', sans-serif",
                }}>{chip}</span>
            )}

            {title && (
                <h2 style={{
                    fontSize: 'clamp(26px, 4vw, 42px)',
                    fontWeight: 700,
                    color: light ? '#ffffff' : '#0b1f3a',
                    lineHeight: 1.2,
                    marginBottom: subtitle ? 14 : 0,
                    fontFamily: "'Poppins', sans-serif",
                }}>{title}</h2>
            )}

            {subtitle && (
                <p style={{
                    fontSize: 16,
                    color: light ? 'rgba(255,255,255,0.7)' : '#2c4a5e',
                    lineHeight: 1.75,
                    fontFamily: "'Poppins', sans-serif",
                }}>{subtitle}</p>
            )}
        </div>
    );
}