import React, { useContext } from 'react';
import './chat.scss';
import ChatMessages from '../organisms/ChatMessages';
import ChatInput from '../organisms/ChatInput';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import ChatHeader from '../organisms/ChatHeader';

const Chat = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  console.log('[data]: ', data);
  return (
    <div className="chat-wrapper">

      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </div>
  );
}

export default Chat;
