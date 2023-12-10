import React, { useContext } from 'react';
import './chat.scss';
import Camera from '../../assets/images/camera.png';
import AddUser from '../../assets/images/add-user.png';
import More from '../../assets/images/more.png';
import Messages from './messages/Messages';
import Input from './input/Input';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { ImageSize, ImageType } from '../../utils/types';
import DefaultUserIcon from '../../assets/images/user.png';
import Image from '../atoms/Image';

const Chat = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  console.log('[data]: ', data);
  return (
    <div className="chat-wrapper">
      <div className="chat-info-wrapper">

        <div className="chat-user-info-wrapper">
          <Image image={data.user.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
          <span>{ data.user.displayName }</span>
        </div>

        <div className="chat-icons-wrapper">
          <Image image={Camera} type={ImageType.ICON} />
          <Image image={AddUser} type={ImageType.ICON} />
          <Image image={More} type={ImageType.ICON} />
        </div>
      </div>

      <Messages />

      <Input />
    </div>
  );
}

export default Chat;
