import { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────
   useLocalStorage
   Works exactly like useState but persists the
   value in localStorage automatically.

   Usage:
     const [theme, setTheme] = useLocalStorage('sm_theme', 'light');
───────────────────────────────────────────── */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch {
            // silently fail (e.g. private browsing quota exceeded)
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

export default useLocalStorage;