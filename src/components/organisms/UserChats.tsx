import React, { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { ChatUser, ImageSize, UserChatDocument } from '../../utils/types';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

import ChatThumbnail from '../molecules/ChatThumbnail';
import { FIREBASE } from '../../utils/firebase';
import { useDispatch } from 'react-redux';
import { updateHistory, updateCurrentChatSelection } from '../../store/redux/reducer/chats';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import './userChats.scss';
import Input from '../atoms/Input';

const UserChats = () => {
  const { history: chatsHistory, currentChatSelection } = useAppSelector((state: RootState) => state.chats);

  const { user: currentUser } = useContext<AuthContextType>(AuthContext);
  const dispatch = useDispatch();

  const [ userName, setUserName, ] = useState('');

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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUserName(e.target.value);
  }

  const filterByDisplayName = (array: UserChatDocument[], displayName: string): UserChatDocument[] => {
    if (userName.length === 0) {
      return array;
    }
    const lowerCaseSubstring = displayName.toLowerCase();
    return array.filter(
      (userChatDocument) =>
        userChatDocument.userInfo.displayName.toLowerCase()
          .includes(lowerCaseSubstring)
    );
  }

  return (
    <>
      <div className="local-search-wrapper">
        <Input
          type={'email'}
          placeholder={'Filter users by name'}
          name={'findUser'}
          value={userName}
          handleOnChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
          style={{
            border: '1px solid #1565c0',
            color: '#212121',
            width: '100%'
          }}
        />
      </div>
      <div className="chats-wrapper">
        {chatsHistory.length > 0 &&
          filterByDisplayName(chatsHistory, userName)
            .map((userChat: UserChatDocument) => (
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
    </>
  );
};

export default UserChats;
