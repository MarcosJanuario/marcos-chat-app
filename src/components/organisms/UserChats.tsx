import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react';
import { ChatUser, UserChatDocument } from '../../utils/types';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

import ChatThumbnail from '../molecules/ChatThumbnail';
import { FIREBASE } from '../../utils/firebase';
import { useDispatch } from 'react-redux';
import { updateHistory, updateCurrentChatSelection } from '../../store/redux/reducer/chats';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import Input from '../atoms/Input';
import { ImageSize, TextColor } from '../../utils/enums';

import './userChats.scss';

const UserChats: FC = () => {
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
            color: '#212121',
            width: '84%'
          }}
        />
      </div>
      <div className="chats-wrapper">
        {chatsHistory.length > 0 &&
          filterByDisplayName(chatsHistory, userName)
            .map((userChat: UserChatDocument) => (
              userChat.userInfo && (
                <div key={userChat.userInfo.uid}
                     className={`standard-user ${ currentChatSelection.user.uid === userChat.userInfo.uid && 'current-chat-selected'}`}
                >
                  <ChatThumbnail
                    userInfo={userChat.userInfo}
                    lastMessage={userChat.lastMessage?.text}
                    color={TextColor.WHITE}
                    onClick={(selectedUser: ChatUser) => handleSelect(selectedUser)}
                    size={ImageSize.NORMAL}
                    showOptions={true}
                  />
                </div>
              )
            ))}
      </div>
    </>
  );
};

export default UserChats;
