import React from 'react';
import { ImageSize, ChatUser } from '../../utils/types';
import Avatar from '../avatar/Avatar';
import DefaultUserIcon from '../../assets/images/user.png';

import './chatThumbnail.scss';

interface UserChatComponentProps {
  userInfo: ChatUser;
  lastMessage?: string;
  onClick?: (user: ChatUser) => void;
}

const ChatThumbnail = ({ userInfo, lastMessage, onClick }: UserChatComponentProps) => {
  return (
    <div key={userInfo.uid} className="chat-thumbnail-wrapper"
         onClick={() => onClick && onClick(userInfo)}
    >
      <Avatar
        image={userInfo.photoURL ?? DefaultUserIcon}
        size={ImageSize.BIG}
      />
      <div className="user-chat-info">
        <span>{ userInfo.displayName }</span>
        {
          lastMessage && <p>{ lastMessage}</p>
        }
      </div>
    </div>
  );
};

export default ChatThumbnail;
