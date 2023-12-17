import React, { useContext } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import Text from '../atoms/Text';
import { TextColor, TextType } from '../../utils/enums';

import './modalController.scss';

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
                <Text type={TextType.TITLE} color={TextColor.GRAY}>{ ui.modal.headerText}</Text>
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
