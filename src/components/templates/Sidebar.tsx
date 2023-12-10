import React from 'react';
import UserChatsNavbar from '../molecules/UserChatsNavbar';
import Search from '../sidebar/search/Search';

import './sidebar.scss';
import Chats from '../sidebar/chats/Chats';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">

      <UserChatsNavbar />

      {/*Organism*/}
      <Search />

      {/*Organism*/}
      <Chats />
    </div>
  );
}

export default Sidebar;
