import React from 'react';
import { ImageSize, ChatUser, ImageType, TextType } from '../../utils/types';

import { stringSizeLimiter } from '../../utils/helpers';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { DEFAULT_USER_AVATAR, MAX_STRING_CHARS } from '../../utils/consts';

import './chatThumbnail.scss';

interface UserChatComponentProps {
  userInfo: ChatUser;
  lastMessage?: string;
  onClick?: (user: ChatUser) => void;
  color?: string;
  size?: ImageSize;
}

const ChatThumbnail = ({ userInfo, lastMessage, onClick, color, size }: UserChatComponentProps) => {
  return (
    <div key={userInfo.uid} className="molecule-chat-thumbnail-wrapper" onClick={() => onClick && onClick(userInfo)}>
      <Image image={userInfo.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} size={size ?? ImageSize.BIG} />
      <div className="user-chat-info">
        <Text type={TextType.TITLE} color={color && '#f5f5f5'}>{userInfo.displayName}</Text>
        {
          lastMessage &&
            <p>{ stringSizeLimiter(lastMessage, MAX_STRING_CHARS)}</p>
        }
      </div>
    </div>
  );
};

export default ChatThumbnail;
