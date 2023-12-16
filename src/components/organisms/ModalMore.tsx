import React, { FC } from 'react';
import Text from '../atoms/Text';

import { TextType } from '../../utils/types';

import './modalMore.scss';

const ModalMore: FC = () => {
  return (
    <div className="modal-more-wrapper">
      <div className="modal-header">
        <Text type={TextType.HEADER}>Options</Text>
      </div>
    </div>
  );
}

export default ModalMore;
