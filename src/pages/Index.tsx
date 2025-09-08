import React, { useState } from 'react';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<'richmond' | 'edwina' | null>(null);

  const handleLogin = (user: 'richmond' | 'edwina') => {
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  if (!isLoggedIn || !currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />;
};

export default Index;
