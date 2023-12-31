import React, { FC, useContext, useEffect, useRef } from 'react';
import { MessageChat } from '../../utils/types';

import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import Image from '../atoms/Image';
import BalloonText from '../atoms/BalloonText';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import { DEFAULT_USER_AVATAR } from '../../utils/consts';
import { ImageSize, ImageType } from '../../utils/enums';

import './message.scss';

type MessageProps = {
  message: MessageChat;
}

const Message: FC<MessageProps> = ({ message }) => {
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
    return currentUser.photoURL ?? DEFAULT_USER_AVATAR;
  }

  const lookForSelectedUserImage = (): string => {
    return currentChatSelection.user.photoURL ?? DEFAULT_USER_AVATAR;
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
