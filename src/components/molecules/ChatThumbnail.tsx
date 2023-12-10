import React from 'react';
import { ImageSize, ChatUser, ImageType, TextType } from '../../utils/types';
import DefaultUserIcon from '../../assets/images/user.png';

import './chatThumbnail.scss';
import { stringSizeLimiter } from '../../utils/helpers';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { MAX_STRING_CHARS } from '../../utils/consts';

interface UserChatComponentProps {
  userInfo: ChatUser;
  lastMessage?: string;
  onClick?: (user: ChatUser) => void;
}

const ChatThumbnail = ({ userInfo, lastMessage, onClick }: UserChatComponentProps) => {
  return (
    <div key={userInfo.uid} className="molecule-chat-thumbnail-wrapper" onClick={() => onClick && onClick(userInfo)}>
      <Image image={userInfo.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.BIG} />
      <div className="user-chat-info">
        <Text type={TextType.TITLE} color={'#f5f5f5'}>{userInfo.displayName}</Text>
        {
          lastMessage &&
            <p>{ stringSizeLimiter(lastMessage, MAX_STRING_CHARS)}</p>
        }
      </div>
    </div>
  );
};

export default ChatThumbnail;