import React, { useContext } from 'react';
import Image from '../atoms/Image';
import { ImageSize, ImageType, TextType } from '../../utils/types';

import DefaultLogoutIcon from '../../assets/images/exit.png';
import Text from '../atoms/Text';
import AddUser from '../../assets/images/add-user.png';

import { UIContext, UIReducer } from '../../store/context/UIContext';
import ModalAddUser from './ModalAddUser';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { RootState, useAppSelector } from '../../store/redux/hooks';
import { useDispatch } from 'react-redux';
import { clearCurrentChatSelection } from '../../store/redux/reducer/chats';

import './chatHeader.scss';
import { DEFAULT_USER_AVATAR } from '../../utils/consts';

const ChatHeader = () => {
  const { currentChatSelection } = useAppSelector((state: RootState) => state.chats);
  const { clearUser } = useContext<AuthContextType>(AuthContext);
  const { dispatchUI } = useContext<UIReducer>(UIContext);

  const dispatch = useDispatch();

  const handleOnClick = (content: JSX.Element): void => {
    dispatchUI({
      type: 'HANDLE_MODAL',
      payload: {
        modal: {
          headerText: 'Add user',
          content: content,
          visibility: true
        }
      }
    })
  }

  const signOutUser = (): void => {
    signOut(auth).then(() => {
      dispatch(clearCurrentChatSelection());
      clearUser();
    })
  }

  return (
    <div className="chat-info-wrapper">
      {
        <div className="chat-user-info-wrapper">
          {
            currentChatSelection.chatID &&
              <>
                <Image image={currentChatSelection.user.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
                <Text type={TextType.BODY} color={'#f5f5f5'}>{currentChatSelection.user.displayName}</Text>
              </>
          }
        </div>
      }

      <div className="chat-icons-wrapper">
        <Image image={AddUser} type={ImageType.ICON} size={ImageSize.NORMAL}
               onClick={() => handleOnClick(<ModalAddUser />)} />
        <Image image={DefaultLogoutIcon} type={ImageType.ICON} size={ImageSize.NORMAL}
               onClick={signOutUser} />
      </div>
    </div>
  );
}

export default ChatHeader;
