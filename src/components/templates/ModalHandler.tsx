import React, { useContext, useEffect } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';

import './modalHandler.scss';

type ModalHandlerProps = {
  children: JSX.Element;
}

const ModalHandler = ({ children }: ModalHandlerProps) => {
  const { data: ui, dispatchUI } = useContext<UIReducer>(UIContext);

  useEffect(() => {
    console.log('[UI MODAL HANDLER]: ', ui);
  }, [ui]);

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

export default ModalHandler;
