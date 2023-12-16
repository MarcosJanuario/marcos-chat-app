import React, { FC, useContext, useState } from 'react';
import { ChatUser, LoadingState, TextType } from '../../utils/types';

import { getCombinedID, LOADING_INITIAL_VALUES } from '../../utils/consts';

import { User } from 'firebase/auth';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

import { UIContext, UIReducer } from '../../store/context/UIContext';
import { FIREBASE } from '../../utils/firebase';

import './modalRemoveChat.scss';
import Loading from '../molecules/Loading';

type ModalRemoveChatProps = {
  currentUser: User;
  selectedUser: ChatUser;
};

const ModalRemoveChat: FC<ModalRemoveChatProps> = ({ currentUser, selectedUser }) => {
  const { dispatchUI } = useContext<UIReducer>(UIContext);

  const [loading, setLoading] = useState<LoadingState>(LOADING_INITIAL_VALUES);

  const handleOnConfirm = async (): Promise<void> => {
    setLoading({ message: 'Removing chat...', visible: true });
    const userChatPropertyId = `${getCombinedID(currentUser, selectedUser)}`
    try {
      await Promise.all([
        FIREBASE.deleteChatConversation(currentUser.uid, userChatPropertyId),
        FIREBASE.deleteChatConversation(selectedUser.uid, userChatPropertyId),
      ]);
      setLoading({ message: 'R', visible: false });
      dispatchUI({ type: 'RESET_MODAL' });
    } catch (error: any) {
      console.error('ERROR ON REMOVING CHAT: ', error);
    }
  }

  const handleOnCancel = (): void => {
    dispatchUI({ type: 'RESET_MODAL' });
  }

  return (
    <>
      <div className="confirm-removal-content">

        <div className="result-wrapper">
          <Text type={TextType.BODY} color={'#212121'}>Are you sure you want to remove this chat?</Text>
        </div>

        <div className={'modal-action-wrapper'}>
          <Button text={'Cancel'} onClick={handleOnCancel} />
          <Button text={'Confirm'} onClick={handleOnConfirm}
                  style={{ backgroundColor: '#ff1744'}} />
        </div>

      </div>
      {
        loading.visible && <Loading message={loading.message} />
      }
    </>
  );
};

export default ModalRemoveChat;
