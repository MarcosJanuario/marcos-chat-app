import React from 'react';
import './avatar.scss';
import { AvatarSize } from '../../utils/types';

interface AvatarProps {
  image: string;
  size?: AvatarSize;
}
const Avatar = ({ image, size = AvatarSize.NORMAL }: AvatarProps) => {
  const getSizeStyles = () => {
    switch (size) {
      case AvatarSize.SMALL:
        return { width: '1rem', height: '1rem' };
      case AvatarSize.NORMAL:
        return { width: '2rem', height: '2rem' };
      case AvatarSize.BIG:
        return { width: '3rem', height: '3rem' };
      default:
        return { width: '2rem', height: '2rem' };
    }
  };
  return <img src={image} alt="Image Avatar"
              className={'image-avatar-component'}
              style={{ ...getSizeStyles() }}
  />;
}

export default Avatar;
