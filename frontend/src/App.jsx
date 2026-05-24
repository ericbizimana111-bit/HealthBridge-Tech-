import React from 'react';
import './index.css';

// ── Context ─────────────────────────────────
import { AppProvider, useApp } from './context/AppContext';

// ── Layout ──────────────────────────────────
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// ── UI ──────────────────────────────────────
import PageTransition from './components/ui/PageTransition';
import ChatbotWidget from './components/chat/ChatbotWidget';

// ── Pages ───────────────────────────────────
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import CommunityPage from './pages/CommunityPage';
import WellnessPage from './pages/WellnessPage';
import MusicPage from './pages/MusicPage';
import ChatPage from './pages/ChatPage';
import VideoCallPage from './pages/VideoCallPage';
import DashboardPage from './pages/DashboardPage';
import DoctorDashboardPage from './pages/DoctorDashboardPage';
import NotificationsPage from './pages/NotificationsPage';
import TestimonialsPage from './pages/TestimonialsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';

/* Pages that render full-screen (no Navbar/Footer) */
const FULL_SCREEN = ['login', 'signup', 'video-call'];

/* ─────────────────────────────────────────────
   Inner app — consumes context
───────────────────────────────────────────── */
function AppInner() {
  const { page, navigate, isLoggedIn, user, login, logout, selectedDoctor } = useApp();
  const isFullScreen = FULL_SCREEN.includes(page);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} user={user} />;

      case 'doctors':
        return <DoctorsPage navigate={navigate} />;

      case 'doctor-profile':
        return <DoctorProfilePage doctor={selectedDoctor} navigate={navigate} />;

      case 'community':
        return <CommunityPage navigate={navigate} />;

      case 'wellness':
        return <WellnessPage navigate={navigate} />;

      case 'music':
        return <MusicPage navigate={navigate} />;

      case 'chat':
        return <ChatPage navigate={navigate} />;

      case 'video-call':
        return <VideoCallPage navigate={navigate} doctor={selectedDoctor} />;

      case 'dashboard':
        if (!isLoggedIn) { navigate('login'); return null; }
        return user?.role === 'doctor' || user?.role === 'counselor' || user?.role === 'healthcare'
          ? <DoctorDashboardPage navigate={navigate} user={user} onLogout={logout} />
          : <DashboardPage navigate={navigate} user={user} onLogout={logout} />;

      case 'doctor-dashboard':
        return <DoctorDashboardPage navigate={navigate} user={user} onLogout={logout} />;

      case 'notifications':
        return <NotificationsPage navigate={navigate} />;

      case 'testimonials':
        return <TestimonialsPage navigate={navigate} />;

      case 'about':
        return <AboutPage navigate={navigate} />;

      case 'contact':
        return <ContactPage navigate={navigate} />;

      case 'login':
        return <LoginPage navigate={navigate} onLogin={login} />;

      case 'signup':
        return <SignupPage navigate={navigate} onLogin={login} />;

      default:
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navbar — hidden on full-screen pages */}
      {!isFullScreen && (
        <Navbar
          page={page}
          navigate={navigate}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={logout}
        />
      )}

      {/* Page content with fade transition */}
      <main style={{ flex: 1 }}>
        <PageTransition pageKey={page}>
          {renderPage()}
        </PageTransition>
      </main>

      {/* Footer — hidden on full-screen pages */}
      {!isFullScreen && <Footer navigate={navigate} />}

      {/* Floating AI chatbot — hidden only on auth pages */}
      {page !== 'login' && page !== 'signup' && (
        <ChatbotWidget navigate={navigate} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Root — wraps everything in AppProvider
───────────────────────────────────────────── */
export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}


