import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';

import Button from '../atoms/Button';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { AppError, FileType } from '../../utils/types';

import { FIREBASE } from '../../utils/firebase';
import ErrorBlock from '../molecules/ErrorBlock';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import './chatInput.scss';
import Input from '../atoms/Input';

const ChatInput = () => {
  // const { data: chat } = useContext<ChatReducer>(ChatContext);
  const { currentChatSelection } = useAppSelector((state: RootState) => state.chats);

  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const [text, setText] = useState<string>('');
  const [image, setImage ] = useState<FileType | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const handleSendMessage = async (): Promise<void> => {
    console.log('[handleSendMessage]: ', text.trim().length > 0);
    if (text.trim().length > 0) {
      const tempText = text;
      setText('');
      try {
        if (currentChatSelection.chatID) {
          if (image) {
            await FIREBASE.uploadImageMessage(currentUser, currentChatSelection.chatID, tempText, image);
          } else {
            await FIREBASE.sendTextMessage(currentUser, currentChatSelection.chatID, tempText);
          }

          await FIREBASE.updateUserChats(currentUser.uid, currentChatSelection.chatID, tempText);
          await FIREBASE.updateUserChats(currentChatSelection.user.uid, currentChatSelection.chatID, tempText);

          setText('');
          setImage(null);
        }
      } catch (error) {
        console.log('[SENDING MESSAGE error]: ', error);
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
      <>
        {
          currentChatSelection.chatID &&
            <>
              <Input
                type={'email'}
                placeholder={'Enter a message'}
                name={'text-message'}
                value={text}
                handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
                handleOnKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(e)}
                style={{
                  flex: 1,
                  color: '#212121',
                  height: '100%'
                }}
              />
              <div className="send-options-wrapper">
                <Button text={'Send'} onClick={handleSendMessage} />
              </div>
            </>
        }
      </>
      {
        error && error?.message && <ErrorBlock text={error.message} />
      }
    </div>
  );
}

export default ChatInput;
