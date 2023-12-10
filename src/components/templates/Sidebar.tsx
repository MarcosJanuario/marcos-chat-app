import React from 'react';
import UserChatsNavbar from '../organisms/UserChatsNavbar';
import UserChatsSearch from '../organisms/UserChatsSearch';

import './sidebar.scss';
import UserChats from '../organisms/UserChats';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">

      <UserChatsNavbar />

      {/*Organism*/}
      <UserChatsSearch />

      {/*Organism*/}
      <UserChats />
    </div>
  );
}

export default Sidebar;
