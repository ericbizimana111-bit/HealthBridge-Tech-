import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   useDebounce
   Delays updating a value until the user stops
   typing — prevents excessive re-renders during
   search / filter inputs.

   Usage:
     const debouncedSearch = useDebounce(searchTerm, 350);
───────────────────────────────────────────── */
export function useDebounce(value, delay = 350) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;