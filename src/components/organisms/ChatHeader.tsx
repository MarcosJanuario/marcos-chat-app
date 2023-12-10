import React, { useContext } from 'react';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import Image from '../atoms/Image';
import { ImageSize, ImageType, TextType } from '../../utils/types';

import DefaultUserIcon from '../../assets/images/user.png';
import Text from '../atoms/Text';
import Camera from '../../assets/images/camera.png';
import AddUser from '../../assets/images/add-user.png';
import More from '../../assets/images/more.png';

import './chatHeader.scss';

const ChatHeader = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  return (
    <div className="chat-info-wrapper">
      {
        <div className="chat-user-info-wrapper">
          {
            data.chatID &&
              <>
                <Image image={data.user.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.NORMAL} />
                <Text type={TextType.BODY} color={'#bbdefb'}>{data.user.displayName}</Text>
              </>
          }
        </div>
      }

      <div className="chat-icons-wrapper">
        <Image image={Camera} type={ImageType.ICON} />
        <Image image={AddUser} type={ImageType.ICON} />
        <Image image={More} type={ImageType.ICON} />
      </div>
    </div>
  );
}

export default ChatHeader;
