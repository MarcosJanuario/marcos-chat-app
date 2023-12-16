import React, { ChangeEvent, FC, KeyboardEvent, useContext, useState } from 'react';
import { User } from 'firebase/auth';
import { cloneDeep } from 'lodash';

import Button from '../atoms/Button';
import Input from '../atoms/Input';
import ErrorBlock from '../molecules/ErrorBlock';

import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { AppError, ChatUser, FileType } from '../../utils/types';
import { FIREBASE } from '../../utils/firebase';
import { RootState, useAppSelector } from '../../store/redux/hooks';
import { getCombinedID } from '../../utils/consts';
import { ChatSelection } from '../../store/redux/actions/chats';

import './chatInput.scss';

const ChatInput: FC = () => {
  const { currentChatSelection } = useAppSelector((state: RootState) => state.chats);
  const { user: currentUser } = useContext<AuthContextType>(AuthContext);

  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<FileType | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const handleSendMessage = async (): Promise<void> => {
    const tempCurrentUser: User = cloneDeep(currentUser);
    const tempChatSelectionData: ChatSelection = cloneDeep(currentChatSelection);

    if (text.trim().length > 0) {
      setText('');
      try {
        if (tempChatSelectionData.chatID) {
          if (image) {
            await FIREBASE.uploadImageMessage(tempCurrentUser, tempChatSelectionData.chatID, text, image);
          } else {
            await FIREBASE.updateChatsMessages(tempCurrentUser, tempChatSelectionData.chatID, text);
          }

          const combinedId = getCombinedID(tempCurrentUser, tempChatSelectionData.user);

          const userInfo: ChatUser = {
            uid: tempCurrentUser.uid,
            email: tempCurrentUser.email ?? '',
            displayName: tempCurrentUser.displayName ?? '',
            ...(tempCurrentUser.photoURL && { photoURL: tempCurrentUser.photoURL }),
          };

          await Promise.all([
            FIREBASE.updateUserChats(tempCurrentUser.uid, combinedId, text, tempChatSelectionData.user),
            FIREBASE.updateUserChats(tempChatSelectionData.user.uid, combinedId, text, userInfo),
          ]);

          setText('');
          setImage(null);
        }
      } catch (error) {
        console.error('[SENDING MESSAGE error]: ', error);
        setError({ code: 0, message: 'Error sending the message' });
      }
    }
  };

  const handleOnKeyDown = async (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> => {
    if (e.code === 'Enter' || e.key === 'Enter') {
      await handleSendMessage();
    }
  };

  return (
    <div className="input-wrapper">
      {currentChatSelection.chatID && (
        <>
          <Input
            type="email"
            placeholder="Enter a message"
            name="text-message"
            value={text}
            handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            handleOnKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleOnKeyDown(e)}
            style={{
              flex: 1,
              color: '#212121',
              height: '100%',
            }}
          />
          <div className="send-options-wrapper">
            <Button text="Send" onClick={handleSendMessage} />
          </div>
        </>
      )}
      {error && error?.message && <ErrorBlock text={error.message} />}
    </div>
  );
};

export default ChatInput;
