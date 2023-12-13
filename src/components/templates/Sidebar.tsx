import React from 'react';
import UserChatsNavbar from '../organisms/UserChatsNavbar';

import UserChats from '../organisms/UserChats';

import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <UserChatsNavbar />
      <UserChats />
    </div>
  );
}

export default Sidebar;
