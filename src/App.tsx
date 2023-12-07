import React, { useContext } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { AuthContext } from './store/context/AuthContext';
import { User } from 'firebase/auth';

const App = () => {
  const user = useContext<User>(AuthContext);

  console.log('[currentUser]', user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'}>
          <Route index element={user.uid ? <Home /> : <Login />} />
          <Route path={'login'} element={user.uid ? <Home /> : <Login />} />
          <Route path={'register'} element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
