import React, { useState } from 'react';
import NavDrawer from './components/NavDrawer/NavDrawer';
import ThemeManager from './ThemeManager';
import { UserInfoProvider } from './UserInfoProvider';
import App from './App';
import LoginRegister from './views/LoginRegister/LoginRegister';


const StartApp = () => {
  const [dismiss, setDismiss] = useState(true);

  const dismissComponent = () => {
    setDismiss(true);
  };

  
const routes = [
    {
      path: '/',
      title: 'Home',
      module: './views/Home/Home',
    },
    {
      path: '/projects',
      title: 'Projects',
      module: './views/Projects/Projects',
    },
    {
      path: '/mapp',
      title: 'New Mapp',
      module: './views/Mapp/Mapp',
    },
    {
      path: '/profile',
      title: 'Profile',
      module: './views/Profile/Profile',
    },
  ];
  
  const TManager = ThemeManager.Instance;
  const startTheme = TManager.currentTheme;
  
  function handleSwitch(ev: any) {
    TManager.toggleTheme();
  }

  const handleLogin = ()=> {
    setDismiss(false);
  }


  return (
    <div id="toggle" className={`${startTheme} main-window`}>
      <UserInfoProvider>
        {!dismiss && (
          <LoginRegister dismissComponent={dismissComponent}></LoginRegister>
        )}
        <NavDrawer routes={routes} handleSwitch={handleSwitch} handleLogin={handleLogin}></NavDrawer>
        <App></App>
      </UserInfoProvider>
    </div>
  );
};

export default StartApp;
