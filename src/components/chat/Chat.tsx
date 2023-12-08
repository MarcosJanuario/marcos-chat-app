import React, { useContext } from 'react';
import './chat.scss';
import Camera from '../../assets/images/camera.png';
import AddUser from '../../assets/images/add-user.png';
import More from '../../assets/images/more.png';
import Icon from '../icon/Icon';
import Messages from './messages/Messages';
import Input from './input/Input';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';

const Chat = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  console.log('[data]: ', data);
  return (
    <div className="chat-wrapper">
      <div className="chat-info-wrapper">
        <span>{ data.user?.displayName }</span>
        <div className="chat-icons-wrapper">
          <Icon image={Camera} />
          <Icon image={AddUser} />
          <Icon image={More} />
        </div>
      </div>

      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
