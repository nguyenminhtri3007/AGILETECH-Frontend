import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import ApplicationComponent from './screens/application.component';
import HomePage from './screens/homepage.component';
import Profile from './screens/profile.component';
import * as AuthService from './data/services/auth.service';
import { AppConfig } from './common/config/app.config';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

const RootApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const appConfig = new AppConfig();
    const isLogged = appConfig.getAccessToken();
    if (isLogged) {
      setIsLoggedIn(true);
    }
  }, []);

  const HomePageWithNav = () => {
    const navigate = useNavigate();
    return (
      <HomePage
        isLoggedIn={isLoggedIn}
        onSignIn={() => navigate('/login')}
        onLogout={async () => {
          await AuthService.logout();
          setIsLoggedIn(false);
          navigate('/');
        }}
        onProfile={() => navigate('/profile')}
      />
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<ApplicationComponent onLoginSuccess={() => { setIsLoggedIn(true); }} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<HomePageWithNav />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RootApp />
);

reportWebVitals();
