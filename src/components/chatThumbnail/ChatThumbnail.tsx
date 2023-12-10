import React from 'react';
import { ImageSize, ChatUser, ImageType } from '../../utils/types';
import DefaultUserIcon from '../../assets/images/user.png';

import './chatThumbnail.scss';
import { stringSizeLimiter } from '../../utils/helpers';
import Image from '../atoms/Image';

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
      <Image image={userInfo.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.BIG} />
      <div className="user-chat-info">
        <span>{ userInfo.displayName }</span>
        {
          lastMessage && <p>{ stringSizeLimiter(lastMessage, 17)}</p>
        }
      </div>
    </div>
  );
};

export default ChatThumbnail;
