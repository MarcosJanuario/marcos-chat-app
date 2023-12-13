import React, { useContext, useEffect } from 'react';
import { ChatUser, ImageSize, UserChatDocument } from '../../utils/types';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

import ChatThumbnail from '../molecules/ChatThumbnail';
import { FIREBASE } from '../../utils/firebase';
import { useDispatch } from 'react-redux';
import { updateHistory, updateCurrentChatSelection } from '../../store/redux/reducer/chats';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import './userChats.scss';

const UserChats = () => {
  const { history: chatsHistory, currentChatSelection } = useAppSelector((state: RootState) => state.chats);

  const { user: currentUser } = useContext<AuthContextType>(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribe: () => void;

    if (currentUser.uid) {
      unsubscribe = FIREBASE.getUserChats(currentUser as ChatUser, (sortedUserChats) => {
        dispatch(updateHistory(sortedUserChats));
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentUser.uid]);

  const handleSelect = (selectedUser: ChatUser): void => {
    dispatch(updateCurrentChatSelection({
      currentUser: currentUser,
      selectedUser: selectedUser
    }))
  };

  return (
    <div className="chats-wrapper">
      {chatsHistory.length > 0 &&
        chatsHistory.map((userChat: UserChatDocument) => (
          userChat.userInfo && (
            <div key={userChat.userInfo.uid}
                 className={`${ currentChatSelection.user.uid === userChat.userInfo.uid && 'current-chat-selected'}`}
            >
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
