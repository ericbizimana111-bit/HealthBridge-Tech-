/* ============================================================
   SANAMIND – UTILITY HELPERS
   Pure functions. No side effects. No React imports.
   Import these wherever you need them.
   ============================================================ */

/**
 * Format a number of seconds into MM:SS display.
 * @param {number} totalSeconds
 * @returns {string} e.g. "04:32"
 */
export function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/**
 * Truncate a string to maxLen characters, appending "…" if cut.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export function truncate(str, maxLen = 120) {
    if (!str || str.length <= maxLen) return str;
    return str.slice(0, maxLen).trimEnd() + '…';
}

/**
 * Return the initials of a full name (up to 2 characters).
 * e.g. "Amara Nwosu" → "AN"
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name = '') {
    return name
        .split(' ')
        .filter(Boolean)
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join('');
}

/**
 * Clamp a number between min and max (inclusive).
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

/**
 * Convert a percentage (0–100) and a duration string "M:SS"
 * into a formatted elapsed time string.
 * @param {number} pct  – 0 to 100
 * @param {string} dur  – e.g. "5:32"
 * @returns {string}
 */
export function pctToTime(pct, dur) {
    const [m, s] = dur.split(':').map(Number);
    const total = m * 60 + s;
    const elapsed = Math.floor((clamp(pct, 0, 100) / 100) * total);
    return formatTime(elapsed);
}

/**
 * Return a greeting based on current hour.
 * @returns {string} "Good morning" | "Good afternoon" | "Good evening"
 */
export function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
}

/**
 * Debounce a function call.
 * (Use the useDebounce hook for React state — this is for
 *  non-reactive callbacks like window resize handlers.)
 * @param {Function} fn
 * @param {number}   delay – ms
 * @returns {Function}
 */
export function debounce(fn, delay = 350) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

/**
 * Shuffle an array (Fisher-Yates). Returns a new array.
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Format a date or timestamp to a friendly relative string.
 * e.g. "2 hours ago", "Yesterday", "3 days ago"
 * @param {Date|string|number} date
 * @returns {string}
 */
export function timeAgo(date) {
    const now = Date.now();
    const then = new Date(date).getTime();
    const diffSec = Math.floor((now - then) / 1000);
    if (diffSec < 60) return 'just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} min ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
    if (diffSec < 172800) return 'yesterday';
    return `${Math.floor(diffSec / 86400)} days ago`;
}

/**
 * Validate an email address with a simple regex.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email = '') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validate a password: min 8 chars, at least one letter and one number.
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password = '') {
    if (password.length < 8) return { valid: false, message: 'Password must be at least 8 characters.' };
    if (!/[a-zA-Z]/.test(password)) return { valid: false, message: 'Password must contain at least one letter.' };
    if (!/\d/.test(password)) return { valid: false, message: 'Password must contain at least one number.' };
    return { valid: true, message: '' };
}

/**
 * Convert a hex colour to an rgba string.
 * @param {string} hex   – e.g. "#26b8a0"
 * @param {number} alpha – 0 to 1
 * @returns {string}
 */
export function hexToRgba(hex, alpha = 1) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}