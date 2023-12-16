import React, { FC, useEffect, useState } from 'react';
import Message from '../molecules/Message';
import { MessageChat } from '../../utils/types';
import { FIREBASE } from '../../utils/firebase';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import './chatMessages.scss';

const ChatMessages: FC = () => {
  const { currentChatSelection } = useAppSelector((state: RootState) => state.chats);
  const [messages, setMessages] = useState<MessageChat[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;
    if (currentChatSelection.chatID) {
      unsubscribe = FIREBASE.getChatMessages(currentChatSelection.chatID,
        (chatMessages: MessageChat[]) => {
        setMessages(chatMessages);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [currentChatSelection.chatID]);

  return (
    <div className="messages-wrapper">
      {Object.keys(currentChatSelection.user).length > 0
        && messages.map((message: MessageChat) => (
        <div key={message.id}>
          <Message message={message} />
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
