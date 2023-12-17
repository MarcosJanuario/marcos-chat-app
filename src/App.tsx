import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import { AuthContext, AuthContextType } from './store/context/AuthContext';
import ModalController from './components/templates/ModalController';

const App = () => {
  const { user } = useContext<AuthContextType>(AuthContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user.uid) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [user]);

  return (
    <ModalController>
      <BrowserRouter>
        <Routes>
          <Route path={'/'}>
            {loggedIn ? (
              <Route index element={<Home />} />
            ) : (
              <Route index element={<Login />} />
            )}
            <Route path={'login'} element={loggedIn ? <Navigate to="/" /> : <Login />} />
            <Route path={'register'} element={loggedIn ? <Navigate to="/" /> : <Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ModalController>
  );
}

export default App;
