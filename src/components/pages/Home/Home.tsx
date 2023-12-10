import React from 'react';
import Sidebar from '../../sidebar/Sidebar';
import Chat from '../../chat/Chat';
import './home.scss';

const Home = () => {
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
