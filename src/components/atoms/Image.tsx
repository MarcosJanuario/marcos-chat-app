import React from 'react';
import { ImageSize, ImageType } from '../../utils/types';

import './image.scss';

interface AvatarProps {
  image: string;
  type: ImageType;
  size?: ImageSize;
  onClick?: () => void;
  disabled?: boolean;
}
const Image = ({ image, type, size, onClick, disabled = false }: AvatarProps) => {
  const getSizeStyles = () => {
    switch (size) {
      case ImageSize.SMALL:
        return { width: '1rem', height: '1rem', minWidth: '1rem', minHeight: '1rem' };
      case ImageSize.NORMAL:
        return { width: '2rem', height: '2rem', minWidth: '2rem', minHeight: '2rem' };
      case ImageSize.BIG:
        return { width: '3rem', height: '3rem', minWidth: '3rem', minHeight: '3rem' };
      default:
        return ;
    }
  };
  if (type === ImageType.AVATAR) {
    return (
      <img src={image} alt="Image Avatar" className={'image-avatar'} style={{ ...getSizeStyles() }} />
    );
  } else {
    return (
      <div className={`clickable-icon ${disabled && 'disabled'}`} onClick={() => !disabled && onClick && onClick()}>
        <img src={image} alt="Image Avatar" className={'image-avatar'} style={{ ...getSizeStyles() }} />
      </div>
    )
  }
}

export default Image;
