import React, { useContext, useEffect, useRef } from 'react';
import { ImageSize, ImageType, MessageChat } from '../../utils/types';

import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import DefaultUserIcon from '../../assets/images/user.png';
import Image from '../atoms/Image';
import BalloonText from '../atoms/BalloonText';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import './message.scss';

type MessageProps = {
  message: MessageChat;
}

const Message = ({ message }: MessageProps) => {
  const { currentChatSelection } = useAppSelector((state: RootState) => state.chats);
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

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
    return currentChatSelection.user.photoURL ?? DefaultUserIcon;
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
