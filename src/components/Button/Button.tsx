import React from 'react';

import './button.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}
const Button = ({ text, onClick, disabled }: ButtonProps) => {
  return (
    <button className={`${disabled && disabled}`} onClick={onClick} disabled={disabled}>{ text }</button>
  );
}

export default Button;
