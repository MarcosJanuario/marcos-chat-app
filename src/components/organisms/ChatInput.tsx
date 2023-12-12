import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';

import Button from '../atoms/Button';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { AppError, FileType } from '../../utils/types';

import './chatInput.scss';
import { FIREBASE } from '../../utils/firebase';
import ErrorBlock from '../molecules/ErrorBlock';

const ChatInput = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const [text, setText] = useState<string>('');
  const [image, setImage ] = useState<FileType | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const handleSendMessage = async (): Promise<void> => {
    if (text.trim().length > 0) {
      const tempText = text;
      setText('');
      try {
        if (data.chatID) {
          if (image) {
            await FIREBASE.uploadImageMessage(currentUser, data.chatID, tempText, image);
          } else {
            await FIREBASE.sendTextMessage(currentUser, data.chatID, tempText);
          }

          await FIREBASE.updateUserChats(currentUser.uid, data.chatID, tempText);
          await FIREBASE.updateUserChats(data.user.uid, data.chatID, tempText);

          setText('');
          setImage(null);
        }
      } catch (error) {
        setError({ code: 0, message: 'Error by sending the message' });
      }
      setImage(null);
    }
  }

  const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> => {
    if (e.code === 'Enter' || e.key === 'Enter') {
      await handleSendMessage();
    }
  }

  return (
    <div className="input-wrapper">
      <textarea placeholder={'Enter a message'}
                value={text}
                onKeyDown={(e: KeyboardEvent<HTMLTextAreaElement>) => handleOnKeyDown(e)}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
      />
      <div className="send-options-wrapper">
        <Button text={'Send'} onClick={handleSendMessage} />
      </div>
      {
        error && error?.message && <ErrorBlock text={error.message} />
      }
    </div>
  );
}

export default ChatInput;
