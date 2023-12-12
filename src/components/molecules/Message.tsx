import React, { useContext, useEffect, useRef } from 'react';
import { ImageSize, ImageType, MessageChat } from '../../utils/types';

import './message.scss';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import DefaultUserIcon from '../../assets/images/user.png';
import Image from '../atoms/Image';
import BalloonText from '../atoms/BalloonText';

type MessageProps = {
  message: MessageChat;
}

const Message = ({ message }: MessageProps) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { data } = useContext<ChatReducer>(ChatContext);

  const ref = useRef<any>();

  useEffect(() => {
    ref && ref.current?.scrollIntoView({ behaviour: 'smooth' } as ScrollIntoViewOptions);
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
        <Image image={getMessageOwnerImage()} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
      </div>
      <BalloonText message={message} />
    </div>
  );
}

export default Message;
