import React, { createContext, useContext, useState, useCallback } from 'react';

/* ─────────────────────────────────────────────
   AppContext  –  single source of truth for:
   • authenticated user
   • current page / routing
   • global notifications
   • selected doctor (for profile page)
───────────────────────────────────────────── */

const AppContext = createContext(null);

export function AppProvider({ children }) {
    // ── Auth ──────────────────────────────────
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    // ── Routing ───────────────────────────────
    const [page, setPage] = useState('home');
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // ── Notifications ─────────────────────────
    const [notifications, setNotifications] = useState([
        { id: 1, icon: '📅', text: 'Session with Dr. Nwosu tomorrow at 3 PM', time: '1h ago', read: false },
        { id: 2, icon: '💬', text: 'New message from Dr. Tanaka', time: '3h ago', read: false },
        { id: 3, icon: '💧', text: 'Wellness reminder: time to hydrate!', time: '5h ago', read: true },
        { id: 4, icon: '⭐', text: 'Dr. Sharma rated your session 5 stars', time: '1d ago', read: true },
    ]);

    // ── Navigation ────────────────────────────
    const navigate = useCallback((target, data = null) => {
        if (data) setSelectedDoctor(data);
        setPage(target);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // ── Auth actions ──────────────────────────
    const login = useCallback((userData) => {
        setIsLoggedIn(true);
        setUser(userData);
        setPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUser(null);
        setPage('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // ── Notification actions ───────────────────
    const markAllRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    const unreadCount = notifications.filter(n => !n.read).length;

    // ── Exposed value ──────────────────────────
    const value = {
        // auth
        isLoggedIn, user, login, logout,
        // routing
        page, navigate, selectedDoctor,
        // notifications
        notifications, markAllRead, unreadCount,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

/* Hook – use anywhere in the tree */
export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
    return ctx;
}

export default AppContext;