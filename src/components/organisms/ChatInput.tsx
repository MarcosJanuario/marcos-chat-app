import React, { ChangeEvent, useContext, useState } from 'react';

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
    console.log('[handleKeyDown]');
    try {
      if (data.chatID) {
        if (image) {
          await FIREBASE.uploadImageMessage(currentUser, data.chatID, text, image);
        } else {
          await FIREBASE.sendTextMessage(currentUser, data.chatID, text);
        }

        await FIREBASE.updateUserChats(currentUser.uid, data.chatID, text);
        await FIREBASE.updateUserChats(data.user.uid, data.chatID, text);

        setText('');
        setImage(null);
      }
    } catch (error) {
      setError({ code: 0, message: 'Error by sending the message' });
    }

    setText('');
    setImage(null);
  }

  // TODO: when adding image
  // const handleInputFile = (e: ChangeEvent<HTMLInputElement>): void => {
  //   if (e.target?.files && e.target?.files[0]) {
  //     setImage(e.target.files[0] as FileType);
  //   }
  // };

  return (
    <div className="input-wrapper">
      <textarea placeholder={'Enter a message'}
             value={text}
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
