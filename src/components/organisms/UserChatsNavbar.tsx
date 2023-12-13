import React, { useContext } from 'react';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { DEFAULT_USER_AVATAR } from '../../utils/consts';
import Image from '../atoms/Image';
import { ImageType, TextType } from '../../utils/types';
import Text from '../atoms/Text';

import './userChatsNavbar.scss';

const UserChatsNavbar = () => {
  const { user } = useContext<AuthContextType>(AuthContext);

  return (
    <div className="navbar-wrapper">
      <Text type={TextType.TITLE} color={'#f5f5f5'}>Marcos Chat</Text>
      <div className="user">
        <Image image={user.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} />
        <span className={'current-user-name'}>{ user.displayName }</span>
      </div>
    </div>
  );
}

export default UserChatsNavbar;
