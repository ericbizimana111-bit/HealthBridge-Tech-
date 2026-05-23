import React, { useState } from 'react';
import './index.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatbotWidget from './components/chat/ChatbotWidget';
import HomePage from './pages/HomePage';
import DoctorsPage from './pages/DoctorsPage';
import CommunityPage from './pages/CommunityPage';
import WellnessPage from './pages/WellnessPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import ChatPage from './pages/ChatPage';
import DashboardPage from './pages/DashboardPage';
import MusicPage from './pages/MusicPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = (target, data = null) => {
    if (data) setSelectedDoctor(data);
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage navigate={navigate} isLoggedIn={isLoggedIn} user={user} />;
      case 'doctors':
        return <DoctorsPage navigate={navigate} />;
      case 'doctor