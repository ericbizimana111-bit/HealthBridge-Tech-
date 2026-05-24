import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────
   useScrollAnimation
   Returns a ref and a boolean (isVisible).
   Attach the ref to any element — isVisible
   becomes true the moment it enters the viewport.

   Usage:
     const [ref, isVisible] = useScrollAnimation();
     <div ref={ref} style={{ opacity: isVisible ? 1 : 0 }}>…</div>
───────────────────────────────────────────── */
export function useScrollAnimation(threshold = 0.15) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el); // fire once only
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
}

export default useScrollAnimation;