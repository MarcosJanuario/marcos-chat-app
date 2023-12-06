import React from 'react';

import './button.scss';
interface ButtonProps {
  text: string;
  onClick?: () => void;
}
const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button onClick={onClick}>{ text }</button>
  );
}

export default Button;
