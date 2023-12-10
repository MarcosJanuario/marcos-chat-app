import React from 'react';
import UserChatsNavbar from '../organisms/UserChatsNavbar';

import './sidebar.scss';
import UserChats from '../organisms/UserChats';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <UserChatsNavbar />
      <UserChats />
    </div>
  );
}

export default Sidebar;
