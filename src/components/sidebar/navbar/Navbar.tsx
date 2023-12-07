import React from 'react';
import './navbar.scss';
import Avatar from '../../avatar/Avatar';
import Button from '../../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
// import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  // const navigate = useNavigate();
  const signOutUser = (): void => {
    signOut(auth).then(() => {
      console.log('user signed out...');
      // navigate('/login');
    })
  }

  return (
    <div className="navbar-wrapper">
      <span className="logo">Marcos Chat</span>
      <div className="user">
        <Avatar image={'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} />
        <span>Marcos</span>
        <Button text={'Logout'} onClick={() => signOutUser()} />
      </div>
    </div>
  );
}

export default Navbar;
