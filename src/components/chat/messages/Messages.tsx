import React from 'react';
import Message from '../message/Message';

import './messages.scss';

const Messages = () => {
  return (
    <div className="messages-wrapper">
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </div>
  );
}

export default Messages;
