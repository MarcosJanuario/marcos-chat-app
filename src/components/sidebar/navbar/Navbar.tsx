import React, { useContext } from 'react';
import './navbar.scss';
import Button from '../../atoms/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import { DEFAULT_USER_AVATAR } from '../../../utils/consts';
import { ChatContext, ChatReducer } from '../../../store/context/ChatContext';
import Image from '../../atoms/Image';
import { ImageType } from '../../../utils/types';

const Navbar = () => {
  const { user, clearUser } = useContext<AuthContextType>(AuthContext);
  const { data, dispatch } = useContext<ChatReducer>(ChatContext);

  const signOutUser = (): void => {
    signOut(auth).then(() => {
      clearUser();
      dispatch({ type: 'CLEAR' });
    })
  }

  return (
    <div className="navbar-wrapper">
      <span className="logo">Marcos Chat</span>
      <div className="user">
        <Image image={user.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} />
        <span>{ user.displayName }</span>
        <Button text={'Logout'} onClick={() => signOutUser()} />
      </div>
    </div>
  );
}

export default Navbar;
