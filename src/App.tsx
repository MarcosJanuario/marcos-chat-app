import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { AuthContext, AuthContextType } from './store/context/AuthContext';

const App = () => {
  const authContext = useContext<AuthContextType>(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (authContext.user.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authContext.user]);

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
