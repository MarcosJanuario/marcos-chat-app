import React from 'react';
import Navbar from './navbar/Navbar';
import Search from './search/Search';

import './sidebar.scss';
import Chats from './chats/Chats';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default Sidebar;
