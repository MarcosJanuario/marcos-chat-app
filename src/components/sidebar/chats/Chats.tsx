import React, { useContext, useEffect, useState } from 'react';
import { UserChatDocument } from '../../../utils/types';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase';
import { USER_CHATS_DOCUMENT } from '../../../utils/consts';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import { mapObjectToArray } from '../../../utils/helpers';

import './chats.scss';
import ChatThumbnail from '../../chatThumbnail/ChatThumbnail';

const Chats = () => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const [ chats, setChats ] = useState<UserChatDocument[]>([]);

  useEffect(() => {
    if (currentUser.uid) {
      const unsubscribe = onSnapshot(doc(db, USER_CHATS_DOCUMENT, currentUser.uid), (doc) => {
        if (doc.exists()) {
          const userChatsDocument = doc.data();
          const userChatsArray: UserChatDocument[] = mapObjectToArray(userChatsDocument, (value) => ({
            date: value.date,
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

  return (
    <div className="chats-wrapper">
      {
        chats.map((userChat: UserChatDocument) => <ChatThumbnail userInfo={userChat.userInfo} lastMessage={'Hello'} />)
      }
    </div>
  );
}

export default Chats;
