import React, { useContext, useEffect, useRef } from 'react';
import { ImageSize, ImageType, MessageChat, TextType } from '../../utils/types';

import './message.scss';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import DefaultUserIcon from '../../assets/images/user.png';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { dateConverter } from '../../utils/helpers';

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
        <Image image={getMessageOwnerImage()} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
        <Text type={TextType.SMALL} color={'#bdbdbd'} style={{ maxWidth: '3rem', textAlign: 'center' }}>
          { dateConverter(message.date, 'dd.MM.yy HH:mm')}
        </Text>
      </div>

      <div className="message-content-wrapper">
        <p className={`${messageFromLoggedUser() ? 'owner' : 'from-other'}`}>{ message.text }</p>
        { message.image && <img src={message.image} alt={'user attached image'}/> }
      </div>
    </div>
  );
}

export default Message;
