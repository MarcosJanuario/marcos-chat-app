import React, { MutableRefObject, useContext, useEffect, useRef } from 'react';
import Avatar from '../../avatar/Avatar';
import { ImageSize, MessageChat } from '../../../utils/types';

import './message.scss';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import { ChatContext, ChatReducer } from '../../../store/context/ChatContext';
import DefaultUserIcon from '../../../assets/images/user.png';

type messageProps = {
  message: MessageChat;
}

const Message = ({ message }: messageProps) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { data } = useContext<ChatReducer>(ChatContext);

  const ref = useRef<any>();

  useEffect(() => {
    ref && ref.current?.scrollIntoView({ behaviour: 'smooth' });
  }, []);


  const getMessageOwnerImage = (): string => {
    return messageFromLoggedUser() ? lookForLoggedUserImage() : lookForSelectedUserImage();
  }

  const messageFromLoggedUser = (): boolean => message.senderID === currentUser.uid;

  const lookForLoggedUserImage = (): string => {
    return currentUser.photoURL ?? DefaultUserIcon;
  }

  const lookForSelectedUserImage = (): string => {
    return data.user.photoURL ?? DefaultUserIcon;
  }

  return (
    <div className={`message-wrapper ${messageFromLoggedUser() && 'owner'}`} ref={ref}>
      <div className={`message-info-wrapper ${messageFromLoggedUser() ? 'left' : 'right'}`}>
        <Avatar
          image={getMessageOwnerImage()}
          size={ImageSize.NORMAL}
        />
        <span>just now</span>
      </div>

      <div className="message-content-wrapper">
        <p className={`${messageFromLoggedUser() ? 'owner' : 'from-other'}`}>{ message.text }</p>
        { message.image && <img src={message.image} alt={'user attached image'}/> }
      </div>
    </div>
  );
}

export default Message;
