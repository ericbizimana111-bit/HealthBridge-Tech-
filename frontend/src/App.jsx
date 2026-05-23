import { useState, useEffect } from 'react';
import './index.css';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Chatbot
import ChatbotWidget from './components/chat/ChatbotWidget';

// Pages
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import CommunityPage from './pages/CommunityPage';
import WellnessPage from './pages/WellnessPage';
import MusicPage from './pages/MusicPage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// Pages that hide Navbar / Footer
const FULL_SCREEN_PAGES = ['login', 'signup', 'chat'];

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const navigate = (target, data = null) => {
    if (data) setSelectedDoctor(data);
    setPage(target);
  };

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    navigate('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate('home');
  };

  const isFullScreen = FULL_SCREEN_PAGES.includes(page);

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
      case 'dashboard':
        return isLoggedIn
          ? <DashboardPage navigate={navigate} user={user} onLogout={handleLogout} />
          : (() => { navigate('login'); return null; })();
      case 'login':
        return <LoginPage navigate={navigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignupPage navigate={navigate} onLogin={handleLogin} />;
      default:
        return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} user={user} />;
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!isFullScreen && (
        <Navbar
          page={page}
          navigate={navigate}
          isLoggedIn={isLoggedIn}
          user={user}
          onLogout={handleLogout}
        />
      )}
      <main style={{ flex: 1 }}>
        {renderPage()}
      </main>
      {!isFullScreen && <Footer navigate={navigate} />}
      {page !== 'login' && page !== 'signup' && (
        <ChatbotWidget navigate={navigate} />
      )}
    </div>
  );
}
