import React, { FC, useContext } from 'react';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { DEFAULT_USER_AVATAR } from '../../utils/consts';
import Image from '../atoms/Image';
import Text from '../atoms/Text';

import { ImageType, TextColor, TextType } from '../../utils/enums';

import './userChatsNavbar.scss';

const UserChatsNavbar: FC = () => {
  const { user } = useContext<AuthContextType>(AuthContext);

    return (
    <div className="navbar-wrapper">
      <div className="user">
        <Image
          image={user.photoURL ?? DEFAULT_USER_AVATAR}
          type={ImageType.AVATAR}
        />
        <Text type={TextType.HEADER} color={TextColor.WHITE}>{ user.displayName?.toUpperCase() }</Text>
      </div>
    </div>
  );
}

export default UserChatsNavbar;
