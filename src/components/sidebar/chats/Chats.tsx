import React, { useContext, useEffect, useState } from 'react';
import { ChatUser, UserChatDocument } from '../../../utils/types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { USER_CHATS_DOCUMENT } from '../../../utils/consts';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import { mapObjectToArray } from '../../../utils/helpers';

import './chats.scss';
import ChatThumbnail from '../../chatThumbnail/ChatThumbnail';
import { ChatContext, ChatReducer } from '../../../store/context/ChatContext';

const Chats = () => {
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
          setChats(userChatsArray);
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
        chats.map((userChat: UserChatDocument) =>
          <div key={userChat.userInfo.uid}>
            <ChatThumbnail userInfo={userChat.userInfo} lastMessage={userChat.lastMessage?.text}
                           onClick={(selectedUser: ChatUser) => handleSelect(selectedUser)}
            />
          </div>
        )
      }
    </div>
  );
}

export default Chats;
