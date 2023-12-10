import React, { useContext, useEffect } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import Text from '../atoms/Text';

import './modalMore.scss';
import { TextType } from '../../utils/types';


const ModalMore = () => {
  const { data: ui, dispatchUI } = useContext<UIReducer>(UIContext);

  useEffect(() => {
    console.log('[UI MODAL MORE]: ', ui);
  }, [ui]);

  return (
    <div className="modal-more-wrapper">
      <div className="modal-header">
        <Text type={TextType.HEADER}>Options</Text>
      </div>
    </div>
  );
}

export default ModalMore;
