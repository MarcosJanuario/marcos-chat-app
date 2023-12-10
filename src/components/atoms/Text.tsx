import React from 'react';
import { TextType } from '../../utils/types';

import './text.scss';

export type TextProps = {
  children: any;
  type: TextType;
  color?: string;
}

const Text = ({ type, color, children }: TextProps) => {

  return (
    <span
      className={`atomic-text-${type}`}
      style={{color: color}}
    >{ children }
    </span>
  );
}

export default Text;
