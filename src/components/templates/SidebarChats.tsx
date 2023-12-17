import React from 'react';

import UserChats from '../organisms/UserChats';

import './sidebarChats.scss';

const SidebarChats = () => {
  return (
    <div className="sidebar-chats-wrapper">
      <UserChats />
    </div>
  );
}

export default SidebarChats;
