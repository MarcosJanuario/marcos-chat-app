import React from 'react';
import ChatMessages from '../organisms/ChatMessages';
import ChatInput from '../organisms/ChatInput';
import ChatHeader from '../organisms/ChatHeader';

import './chat.scss';

const Chat = () => {
  return (
    <div className="chat-wrapper">

      <ChatHeader />

      <ChatMessages />

      <ChatInput />
    </div>
  );
}

export default Chat;
