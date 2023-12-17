import React, { FC } from 'react';
import SidebarChats from '../templates/SidebarChats';
import Chat from '../templates/Chat';
import './home.scss';
import SidebarMenu from '../templates/SidebarMenu';

const Home: FC = () => {
  return (
    <div className="home-wrapper">
      <div className="home-container">
        <SidebarMenu />
        <SidebarChats />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
