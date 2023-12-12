import React, { CSSProperties } from 'react';
import { TextType } from '../../utils/types';

import './text.scss';

export type TextProps = {
  children: any;
  type: TextType;
  color?: string;
  style?: CSSProperties;
}

const Text = ({ type, color = '#1565C0FF', children, style }: TextProps) => {

  return (
    <span
      className={`app-name atomic-text-${type}`}
      style={{...style, color: color}}
    >{ children }
    </span>
  );
}

export default Text;
