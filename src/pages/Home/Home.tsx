import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Chat from '../../components/chat/Chat';
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
