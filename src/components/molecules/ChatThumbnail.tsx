import React, { useContext, FC, useState } from 'react';
import { ChatUser } from '../../utils/types';

import { stringSizeLimiter } from '../../utils/helpers';
import Image from '../atoms/Image';
import Text from '../atoms/Text';
import { DEFAULT_USER_AVATAR, MAX_STRING_CHARS } from '../../utils/consts';
import MenuOptions, { MenuOption } from './MenuOptions';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import ModalRemoveChat from '../organisms/ModalRemoveChat';

import { ImageSize, ImageType, TextColor, TextType, UIReducerType } from '../../utils/enums';

import './chatThumbnail.scss';

type UserChatProps = {
  userInfo: ChatUser;
  lastMessage?: string;
  onClick?: (user: ChatUser) => void;
  color?: TextColor;
  size?: ImageSize;
  showOptions?: boolean;
};

const MENU_OPTIONS: MenuOption[] = [
  {
    key: 'remove',
    label: 'Remove'
  }
];

const ChatThumbnail: FC<UserChatProps> = ({ userInfo, lastMessage, onClick, color, size, showOptions }) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const { dispatchUI } = useContext<UIReducer>(UIContext);

  const handleOptionClick = async (option: MenuOption): Promise<void> => {
    switch (option.key) {
      case 'remove':
        dispatchUI({
          type: UIReducerType.HANDLE_MODAL,
          payload: {
            modal: {
              headerText: 'Confirm Chat Removal',
              content: <ModalRemoveChat currentUser={currentUser} selectedUser={userInfo} />,
              visibility: true
            }
          }
        })
        break;

      default:
        break;
    }
  };

  return (
    <div
      key={userInfo.uid}
      className="molecule-chat-thumbnail-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(userInfo)}
    >
      <div className="user-info-wrapper">
        <Image image={userInfo.photoURL ?? DEFAULT_USER_AVATAR} type={ImageType.AVATAR} size={size ?? ImageSize.BIG} />
        <div className="user-chat-info">
          <Text type={TextType.TITLE} color={color ?? TextColor.BLACK}>{userInfo.displayName}</Text>
          {
            lastMessage &&
            <Text type={TextType.SMALL} color={color ?? TextColor.BLACK}>
              {stringSizeLimiter(lastMessage, MAX_STRING_CHARS)}
            </Text>
          }
        </div>
      </div>
      {
        showOptions && isHovered &&
          <MenuOptions options={MENU_OPTIONS} onOptionClick={(option: MenuOption) => handleOptionClick(option)} />
      }
    </div>
  );
};

export default ChatThumbnail;
