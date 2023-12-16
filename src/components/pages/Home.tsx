import React, { FC } from 'react';
import Sidebar from '../templates/Sidebar';
import Chat from '../templates/Chat';
import './home.scss';

const Home: FC = () => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
