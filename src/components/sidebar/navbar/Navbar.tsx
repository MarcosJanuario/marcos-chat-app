import React from 'react';
import './navbar.scss';
import Avatar from '../../avatar/Avatar';

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <span className="logo">Marcos Chat</span>
      <div className="user">
        <Avatar image={'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} />
        <span>Marcos</span>
        <button>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
