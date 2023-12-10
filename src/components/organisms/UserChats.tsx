import React, { useContext, useEffect, useState } from 'react';
import { ChatUser, UserChatDocument } from '../../utils/types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { USER_CHATS_DOCUMENT } from '../../utils/consts';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { mapObjectToArray } from '../../utils/helpers';

import './userChats.scss';
import ChatThumbnail from '../molecules/ChatThumbnail';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { cloneDeep } from 'lodash';

const UserChats = () => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { data, dispatch } = useContext<ChatReducer>(ChatContext);
  const [ chats, setChats ] = useState<UserChatDocument[]>([]);

  useEffect(() => {
    if (currentUser.uid) {
      const unsubscribe = onSnapshot(doc(db, USER_CHATS_DOCUMENT, currentUser.uid), (doc) => {
        if (doc.exists()) {

          const userChatsDocument = doc.data();
          const userChatsArray: UserChatDocument[] = mapObjectToArray(userChatsDocument, (value) => ({
            date: value.date,
            lastMessage: value.lastMessage,
            userInfo: value.userInfo,
          }));
          console.log('[userChatsArray]: ', userChatsArray);
          setChats(() => cloneDeep(userChatsArray)
            .sort((a: UserChatDocument, b: UserChatDocument): number => {
              if (!a.date || !b.date) {
                return 0;
              }
              return b.date.seconds - a.date.seconds;
            }));
        }

      });
      return () => {
        unsubscribe();
      }
    }
  }, [currentUser.uid]);

  const handleSelect = (selectedUser: ChatUser): void => {
    dispatch({ type: 'CHANGE_USER', payload: selectedUser})
  }

  return (
    <div className="chats-wrapper">
      {
        chats.length > 0 &&
        chats.map((userChat: UserChatDocument) =>
          userChat.userInfo && <div key={userChat.userInfo.uid}>
            <ChatThumbnail userInfo={userChat.userInfo} lastMessage={userChat.lastMessage?.text}
                           onClick={(selectedUser: ChatUser) => handleSelect(selectedUser)}
            />
          </div>
        )
      }
    </div>
  );
}

export default UserChats;
