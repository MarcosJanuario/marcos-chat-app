import React, { useContext, useEffect, useState } from 'react';
import Message from '../molecules/Message';

import './messages.scss';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { CHATS_DOCUMENT } from '../../utils/consts';
import { MessageChat } from '../../utils/types';

const Messages = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  const [messages, setMessages] = useState<MessageChat[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, CHATS_DOCUMENT, data.chatID), (doc) => {
      if (doc.exists()) {
        console.log('[MESSAGES EXIST]: ', doc.data());
        setMessages(doc.data().messages as MessageChat[]);
      }

    });
    return () => {
      unsubscribe();
    }
  }, [data.chatID]);


  return (
    <div className="messages-wrapper">
      {
        messages.map((message: MessageChat) =>
          <div key={message.id}>
            <Message message={message}/>
          </div>)
      }
    </div>
  );
}

export default Messages;
