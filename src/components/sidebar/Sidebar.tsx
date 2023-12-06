import React from 'react';
import Navbar from './navbar/Navbar';
import Search from './search/Search';

import './sidebar.scss';

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <Navbar />
      <Search />
    </div>
  );
}

export default Sidebar;
