import React, { CSSProperties, FC } from 'react';

import './text.scss';

import { TextColor, TextType } from '../../utils/enums';

export type TextProps = {
  children: any;
  type: TextType;
  color?: TextColor;
  style?: CSSProperties;
}

const Text: FC<TextProps> = ({ type, color = '#1565C0FF', children, style }) => {

  return (
    <span
      className={`app-name atomic-text-${type} ${color ?? 'black'}`}>
      { children }
    </span>
  );
}

export default Text;
