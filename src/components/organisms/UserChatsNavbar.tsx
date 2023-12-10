import React, { useContext } from 'react';
import Button from '../atoms/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { DEFAULT_USER_AVATAR } from '../../utils/consts';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import Image from '../atoms/Image';
import { ImageType, TextType } from '../../utils/types';
import Text from '../atoms/Text';

import './userChatsNavbar.scss';

const UserChatsNavbar = () => {
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
      <Text type={TextType.TITLE} color={'#f5f5f5'}>Marcos Chat</Text>
      <div className="user">
        <Image image={user.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} />
        <span>{ user.displayName }</span>
        <Button text={'Logout'} onClick={() => signOutUser()} />
      </div>
    </div>
  );
}

export default UserChatsNavbar;
