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
      <div className="user">
        <Image
          image={user.photoURL ?? DEFAULT_USER_AVATAR}
          type={ImageType.AVATAR}
        />
        <Text type={TextType.HEADER} color={'#f5f5f5'}>{ user.displayName }</Text>
      </div>
    </div>
  );
}

export default UserChatsNavbar;
