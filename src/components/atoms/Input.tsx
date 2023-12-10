import React, { ChangeEvent, CSSProperties } from 'react';

import './input.scss';

export type InputProps = {
  type: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

const Input = ({ type, placeholder, name, value, handleOnChange, style }: InputProps) => {
  return (
    <input
      className={'atomic-input'}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleOnChange && handleOnChange}
      style={style}
    />
  );
}

export default Input;
