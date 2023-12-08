import React, { useContext } from 'react';
import './navbar.scss';
import Avatar from '../../avatar/Avatar';
import Button from '../../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import User from '../../../assets/images/user.png';

const Navbar = () => {
  const { user, clearUser } = useContext<AuthContextType>(AuthContext);

  const signOutUser = (): void => {
    signOut(auth).then(() => {
      clearUser();
    })
  }

  return (
    <div className="navbar-wrapper">
      <span className="logo">Marcos Chat</span>
      <div className="user">
        <Avatar image={user.photoURL ?? User}  />
        <span>{ user.displayName }</span>
        <Button text={'Logout'} onClick={() => signOutUser()} />
      </div>
    </div>
  );
}

export default Navbar;
