import React, { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────
   PageTransition
   Wraps each page in a fade+slide animation
   that fires whenever `pageKey` changes.

   Props:
     pageKey  – the current page string
     children – page content
───────────────────────────────────────────── */

export default function PageTransition({ pageKey, children }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(false);
        const t = setTimeout(() => setVisible(true), 40);
        return () => clearTimeout(t);
    }, [pageKey]);

    return (
        <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.38s cubic-bezier(0.4,0,0.2,1), transform 0.38s cubic-bezier(0.4,0,0.2,1)',
            fontFamily: "'Poppins', sans-serif",
        }}>
            {children}
        </div>
    );
}