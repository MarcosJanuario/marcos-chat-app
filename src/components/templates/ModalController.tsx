import React, { useContext } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';

import './modalController.scss';
import Text from '../atoms/Text';
import { TextType } from '../../utils/types';

type ModalHandlerProps = {
  children: JSX.Element;
}

const ModalController = ({ children }: ModalHandlerProps) => {
  const { data: ui } = useContext<UIReducer>(UIContext);

  return (
    <>
      {
        children
      }
      {
        ui.modal.visibility &&
        <div className="modal-wrapper">
          <div className="modal-content-wrapper">
            <div className="modal-header-wrapper">
              <div className="modal-header">
                <Text type={TextType.TITLE} color={'#757575'}>{ ui.modal.headerText}</Text>
              </div>
            </div>

            { ui.modal.content }
          </div>
        </div>
      }
    </>
  );
}

export default ModalController;
