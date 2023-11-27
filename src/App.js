import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './Store/AuthContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect( () => {
   
    if(localStorage.getItem("This") === "1"){
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password, college) => {
    localStorage.setItem("This", "1");
    setIsLoggedIn(true);

  };

  const logoutHandler = () => {
    localStorage.removeItem("This");
    setIsLoggedIn(false);
  };

  return (
  
      <AuthContext.Provider value={
        {
          isLoggedIn:isLoggedIn,
          onLogout: logoutHandler,
          }
        }>

      <MainHeader  onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </AuthContext.Provider>
   
  );
}

export default App;
