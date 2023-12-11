import React, { useContext } from 'react';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import Image from '../atoms/Image';
import { ImageSize, ImageType, TextType } from '../../utils/types';

import DefaultUserIcon from '../../assets/images/user.png';
import DefaultLogoutIcon from '../../assets/images/exit.png';
import Text from '../atoms/Text';
import AddUser from '../../assets/images/add-user.png';

import { UIContext, UIReducer } from '../../store/context/UIContext';
import ModalAddUser from './ModalAddUser';

import './chatHeader.scss';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

const ChatHeader = () => {
  const { clearUser } = useContext<AuthContextType>(AuthContext);
  const { data, dispatch } = useContext<ChatReducer>(ChatContext);
  const { dispatchUI } = useContext<UIReducer>(UIContext);

  const handleOnClick = (content: JSX.Element): void => {
    dispatchUI({
      type: 'HANDLE_MODAL',
      payload: {
        modal: {
          content: content,
          visibility: true
        }
      }
    })
  }

  const signOutUser = (): void => {
    signOut(auth).then(() => {
      clearUser();
      dispatch({ type: 'CLEAR' });
    })
  }

  return (
    <div className="chat-info-wrapper">
      {
        <div className="chat-user-info-wrapper">
          {
            data.chatID &&
              <>
                <Image image={data.user.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
                <Text type={TextType.BODY} color={'#bbdefb'}>{data.user.displayName}</Text>
              </>
          }
        </div>
      }

      <div className="chat-icons-wrapper">
        <Image image={AddUser} type={ImageType.ICON}
               onClick={() => handleOnClick(<ModalAddUser />)} />
        <Image image={DefaultLogoutIcon} type={ImageType.ICON}
               onClick={signOutUser} />
      </div>
    </div>
  );
}

export default ChatHeader;
