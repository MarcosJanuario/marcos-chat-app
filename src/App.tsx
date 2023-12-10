import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import Home from './components/pages/Home/Home';
import { AuthContext, AuthContextType } from './store/context/AuthContext';

const App = () => {
  const { user } = useContext<AuthContextType>(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);
  // console.log('[USER]: ', user);

  useEffect(() => {
    if (user.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'}>
          {loggedIn ? (
            <Route index element={<Home />} />
          ) : (
            <Route index element={<Login />} />
          )}
          <Route path={'login'} element={loggedIn ? <Navigate to="/" /> : <Login />} />
          <Route path={'register'} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
