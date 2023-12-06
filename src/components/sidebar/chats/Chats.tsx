import React from 'react';
import './chats.scss';
import Avatar from '../../avatar/Avatar';
import { ImageSize } from '../../../utils/types';

const Chats = () => {
  return (
    <div className="chats-wrapper">
      <div className="user-chat">
        <Avatar
          image={'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          size={ImageSize.BIG}
        />
        <div className="user-chat-info">
          <span>Olga</span>
          <p>Hello</p>
        </div>
      </div>

      <div className="user-chat">
        <Avatar
          image={'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          size={ImageSize.BIG}
        />
        <div className="user-chat-info">
          <span>Olga</span>
          <p>Hello</p>
        </div>
      </div>
    </div>
  );
}

export default Chats;
