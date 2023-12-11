import React, { useContext, useEffect, useState } from 'react';
import Message from '../molecules/Message';
import './chatMessages.scss';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { MessageChat } from '../../utils/types';
import { FIREBASE } from '../../utils/firebase';

const ChatMessages = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  const [messages, setMessages] = useState<MessageChat[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;

    if (data.chatID) {
      unsubscribe = FIREBASE.getChatMessages(data.chatID, (chatMessages) => {
        setMessages(chatMessages);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [data.chatID]);

  return (
    <div className="messages-wrapper">
      {messages.map((message: MessageChat) => (
        <div key={message.id}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
