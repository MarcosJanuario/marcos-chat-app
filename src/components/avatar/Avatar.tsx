import React from 'react';
import './avatar.scss';
import { ImageSize } from '../../utils/types';

interface AvatarProps {
  image: string;
  size?: ImageSize;
}
const Avatar = ({ image, size = ImageSize.NORMAL }: AvatarProps) => {
  const getSizeStyles = () => {
    switch (size) {
      case ImageSize.SMALL:
        return { width: '1rem', height: '1rem', minWidth: '1rem', minHeight: '1rem' };
      case ImageSize.NORMAL:
        return { width: '2rem', height: '2rem', minWidth: '2rem', minHeight: '2rem' };
      case ImageSize.BIG:
        return { width: '3rem', height: '3rem', minWidth: '3rem', minHeight: '3rem' };
      default:
        return { width: '2rem', height: '2rem', minWidth: '2rem', minHeight: '2rem' };
    }
  };
  return <img src={image} alt="Image Avatar" className={'image-avatar-component'} style={{ ...getSizeStyles() }} />;
}

export default Avatar;
