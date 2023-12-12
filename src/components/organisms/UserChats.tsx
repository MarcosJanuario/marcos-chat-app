import React, { useContext, useEffect, useState } from 'react';
import { ChatUser, ImageSize, UserChatDocument } from '../../utils/types';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

import './userChats.scss';
import ChatThumbnail from '../molecules/ChatThumbnail';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { UserChatsContext } from '../../store/context/UserChatsContext';
import { FIREBASE } from '../../utils/firebase';

const UserChats = () => {
  const { user: currentUser } = useContext<AuthContextType>(AuthContext);
  const { dispatch: dispatchMainChat } = useContext(ChatContext);
  const { dispatch: dispatchUserChats } = useContext(UserChatsContext);
  const { data: chat } = useContext<ChatReducer>(ChatContext);
  const [chats, setChats] = useState<UserChatDocument[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    if (currentUser.uid) {
      unsubscribe = FIREBASE.getUserChats(currentUser as ChatUser, (sortedUserChats) => {
        setChats(sortedUserChats);
        dispatchUserChats({ type: 'UPDATE_USER_CHATS', payload: sortedUserChats });
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser.uid]);

  const handleSelect = (selectedUser: ChatUser): void => {
    dispatchMainChat({ type: 'CHANGE_USER', payload: selectedUser });
  };

  return (
    <div className="chats-wrapper">
      {chats.length > 0 &&
        chats.map((userChat: UserChatDocument) => (
          userChat.userInfo && (
            <div key={userChat.userInfo.uid} className={`${ chat.user.uid === userChat.userInfo.uid && 'current-chat-selected'}`}>
              <ChatThumbnail
                userInfo={userChat.userInfo}
                lastMessage={userChat.lastMessage?.text}
                color={'#f5f5f5'}
                onClick={(selectedUser: ChatUser) => handleSelect(selectedUser)}
                size={ImageSize.NORMAL}
              />
            </div>
          )
        ))}
    </div>
  );
};

export default UserChats;
