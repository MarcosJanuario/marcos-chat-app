import React, { CSSProperties, FC } from 'react';

import './button.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}
const Button: FC<ButtonProps> = ({ text, onClick, disabled, style }) => {
  return (
    <button className={`${disabled && disabled}`}
            style={{...style}}
            onClick={onClick} disabled={disabled}>
      { text }
    </button>
  );
}

export default Button;
