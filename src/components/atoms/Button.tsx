import React, { CSSProperties } from 'react';

import './button.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}
const Button = ({ text, onClick, disabled, style }: ButtonProps) => {
  return (
    <button className={`${disabled && disabled}`}
            style={{...style}}
            onClick={onClick} disabled={disabled}>
      { text }
    </button>
  );
}

export default Button;
