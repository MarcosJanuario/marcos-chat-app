import React, { useContext } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';

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
            { ui.modal.content }
          </div>
        </div>
      }
    </>
  );
}

export default ModalController;
