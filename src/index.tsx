import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import ApplicationComponent from './screens/application.component';
import HomePage from './screens/homepage.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    
{/* <ApplicationComponent/> */}
      <HomePage
  isLoggedIn={false}
  onSignIn={() => console.log("Sign in")}
  onLogout={() => console.log("Logout")}
  onProfile={() => console.log("Profile")}
/>
  </React.StrictMode>
);

reportWebVitals();
