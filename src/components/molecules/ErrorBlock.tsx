import React, { CSSProperties, FC } from 'react';
import Text from '../atoms/Text';

import { TextType } from '../../utils/enums';

import './errorBlock.scss';

interface ErrorBlockProps {
  text: string;
  style?: CSSProperties;
}
const ErrorBlock: FC<ErrorBlockProps> = ({ text, style }) => {
  return (
    <div className={'error-wrapper'} style={{...style}}>
      <Text type={TextType.SMALL} color={'#ff5252'}>{ text }</Text>
    </div>
  );
}

export default ErrorBlock;
