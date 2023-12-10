import React, { useContext } from 'react';
import './chat.scss';
import Camera from '../../assets/images/camera.png';
import AddUser from '../../assets/images/add-user.png';
import More from '../../assets/images/more.png';
import Messages from '../organisms/Messages';
import MessageInput from '../molecules/MessageInput';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { ImageSize, ImageType, TextType } from '../../utils/types';
import DefaultUserIcon from '../../assets/images/user.png';
import Image from '../atoms/Image';
import Text from '../atoms/Text';

const Chat = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  console.log('[data]: ', data);
  return (
    <div className="chat-wrapper">

      {/*// Organism*/}
      <div className="chat-info-wrapper">

        <div className="chat-user-info-wrapper">
          <Image image={data.user.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
          <Text type={TextType.BODY} color={'#bbdefb'}>{data.user.displayName}</Text>
        </div>

        <div className="chat-icons-wrapper">
          <Image image={Camera} type={ImageType.ICON} />
          <Image image={AddUser} type={ImageType.ICON} />
          <Image image={More} type={ImageType.ICON} />
        </div>
      </div>

      {/*// Organism*/}
      <Messages />

      {/*// Organism*/}
      <MessageInput />
    </div>
  );
}

export default Chat;
