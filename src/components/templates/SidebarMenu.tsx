import React, { FC, useContext } from 'react';

import './sidebarMenu.scss';
import Image from '../atoms/Image';
import { DEFAULT_USER_AVATAR } from '../../utils/consts';
import { ImageSize, ImageType } from '../../utils/enums';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

const SidebarMenu: FC = () => {
  const { user } = useContext<AuthContextType>(AuthContext);
  return (
    <div className="side-menu-wrapper">
      <div className="side-menu-user-info-wrapper">
        <Image
          image={user.photoURL ?? DEFAULT_USER_AVATAR}
          type={ImageType.AVATAR}
          size={ImageSize.NORMAL}
        />
      </div>
    </div>
  );
}

export default SidebarMenu;
