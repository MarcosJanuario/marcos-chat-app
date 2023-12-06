import React from 'react';
import './icon.scss';
import { ImageSize } from '../../utils/types';

interface IconProps {
  image: string;
  size?: ImageSize;
  onClick?: () => void;
}
const Icon = ({ image, size = ImageSize.NORMAL, onClick }: IconProps) => {
  const getSizeStyles = () => {
    switch (size) {
      case ImageSize.SMALL:
        return { width: '1rem', height: '1rem' };
      case ImageSize.NORMAL:
        return { width: '2rem', height: '2rem' };
      case ImageSize.BIG:
        return { width: '3rem', height: '3rem' };
      default:
        return { width: '2rem', height: '2rem' };
    }
  };
  return <div className="clickable-icon" onClick={onClick}>
    <img src={image} alt="Image Avatar" className={'image-avatar-component'} style={{ ...getSizeStyles() }} />
  </div>;
}

export default Icon;
