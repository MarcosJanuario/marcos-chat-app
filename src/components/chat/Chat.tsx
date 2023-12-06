import React from 'react';
import './chat.scss';
import Camera from '../../assets/images/camera.png';
import AddUser from '../../assets/images/add-user.png';
import More from '../../assets/images/more.png';
import Icon from '../icon/Icon';
import Messages from './messages/Messages';
import Input from './input/Input';

const Chat = () => {
  return (
    <div className="chat-wrapper">
      <div className="chat-info-wrapper">
        <span>Olga</span>
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
