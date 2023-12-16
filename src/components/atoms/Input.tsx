import React, { ChangeEvent, CSSProperties, FC, KeyboardEvent } from 'react';

import './input.scss';

export type InputProps = {
  type: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  style?: CSSProperties;
}

const Input: FC<InputProps> = ({
                 type,
                 placeholder,
                 name,
                 value,
                 handleOnChange,
                 handleOnKeyDown,
                 style
}) => {
  return (
    <input
      className={'atomic-input'}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={handleOnChange && handleOnChange}
      onKeyDown={handleOnKeyDown && handleOnKeyDown}
      style={style}
    />
  );
}

export default Input;
