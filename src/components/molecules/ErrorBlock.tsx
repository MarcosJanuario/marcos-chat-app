import React, { CSSProperties } from 'react';
import Text from '../atoms/Text';

import './errorBlock.scss';
import { TextType } from '../../utils/types';

interface ErrorBlockProps {
  text: string;
  style?: CSSProperties;
}
const ErrorBlock = ({ text, style }: ErrorBlockProps) => {
  return (
    <div className={'error-wrapper'} style={{...style}}>
      <Text type={TextType.SMALL} color={'#ff5252'}>{ text }</Text>
    </div>
  );
}

export default ErrorBlock;
