import React, { useContext, FC } from 'react';
import { ImageSize, ChatUser, ImageType, TextType } from '../../utils/types';

import { stringSizeLimiter } from '../../utils/helpers';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { DEFAULT_USER_AVATAR, getCombinedID, MAX_STRING_CHARS } from '../../utils/consts';

import './chatThumbnail.scss';
import MenuOptions, { MenuOption } from './MenuOptions';
import { FIREBASE } from '../../utils/firebase';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

type UserChatProps = {
  userInfo: ChatUser;
  lastMessage?: string;
  onClick?: (user: ChatUser) => void;
  color?: string;
  size?: ImageSize;
  showOptions?: boolean;
};

const MENU_OPTIONS: MenuOption[] = [
  {
    key: 'delete',
    label: 'Delete'
  }
];

const ChatThumbnail: FC<UserChatProps> = ({ userInfo, lastMessage, onClick, color, size, showOptions }) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const handleOptionClick = async (option: MenuOption): Promise<void> => {
    switch (option.key) {
      case 'delete':
        const userChatPropertyId = `${getCombinedID(currentUser, userInfo)}`
        try {
          await Promise.all([
            FIREBASE.deleteChatConversation(currentUser.uid, userChatPropertyId),
            FIREBASE.deleteChatConversation(userInfo.uid, userChatPropertyId),
          ]);
          onClick && onClick({} as ChatUser);
        } catch (error: any) {
          console.error('ERROR ON DELETING DOCUMENT: ', error);
        }
        break;

      default:
        break;
    }
  };


  return (
    <div key={userInfo.uid} className="molecule-chat-thumbnail-wrapper">
      <div className="user-info-wrapper" onClick={() => onClick && onClick(userInfo)}>
        <Image image={userInfo.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} size={size ?? ImageSize.BIG} />
        <div className="user-chat-info">
          <Text type={TextType.TITLE} color={color && '#f5f5f5'}>{userInfo.displayName}</Text>
          {
            lastMessage &&
            <p>{ stringSizeLimiter(lastMessage, MAX_STRING_CHARS)}</p>
          }
        </div>
      </div>
      {
        showOptions &&
          <MenuOptions options={MENU_OPTIONS} onOptionClick={(option: MenuOption) => handleOptionClick(option)} />
      }
    </div>
  );
};

export default ChatThumbnail;
