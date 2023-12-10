import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import FileUpload from '../../assets/images/send-file.png';
import ImageUpload from '../../assets/images/send-image.png';

import Button from '../atoms/Button';
import { ChatContext, ChatReducer } from '../../store/context/ChatContext';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { AppError, FileType, ImageType } from '../../utils/types';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { CHATS_DOCUMENT, USER_CHATS_DOCUMENT } from '../../utils/consts';
import { v4 as uuid } from 'uuid';
import Image from '../atoms/Image';

import './chatInput.scss';

const ChatInput = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const [text, setText] = useState<string>('');
  const [image, setImage ] = useState<FileType | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const handleSendMessage = async (): Promise<void> => {
    console.log('[handleKeyDown]');
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on('state_changed',
        (snapshot): void => {
          switch (snapshot.state) {
            case 'paused':
              break;
            case 'running':
              break;
          }
        },
        (error: StorageError) => setError({ code: Number(error.code), message: error.message }),
        (): void => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL: string): void => {
              if (data.chatID) {
                console.log('[downloadURL]: ', downloadURL);
                updateDoc(doc(db, CHATS_DOCUMENT, data.chatID), {
                  messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderID: currentUser.uid,
                    date: Timestamp.now(),
                    image: downloadURL
                  })
                })
                  .catch((error) => {
                    console.log('[ERROR SAVING IMAGE MESSAGE]: ', error);
                    setError({ code: error.code, message: error.message });
                  })
              }
            })
            .catch((error) => {
              console.log('[ERROR GETTING IMAGE URL]: ', error);
              setError({ code: error.code, message: error.message });
            })
        }
      );
    } else {
      if (data.chatID) {
        await updateDoc(doc(db, CHATS_DOCUMENT, data.chatID), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderID: currentUser.uid,
            date: Timestamp.now()
          })
        })
          .catch((error) => {
            console.log('[ERROR SAVING TEXT MESSAGE]: ', error);
            setError({ code: error.code, message: error.message });
          })
      }
    }

    await updateDoc(doc(db, USER_CHATS_DOCUMENT, currentUser.uid), {
      [data.chatID + '.lastMessage']: { text: text },
      [data.chatID + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, USER_CHATS_DOCUMENT, data.user.uid), {
      [data.chatID + '.lastMessage']: { text: text },
      [data.chatID + '.date']: serverTimestamp()
    });

    setText('');
    setImage(null);
  }

  const handleInputFile = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target?.files && e.target?.files[0]) {
      setImage(e.target.files[0] as FileType);
    }
  };

  return (
    <div className="input-wrapper">
      <textarea placeholder={'Enter a message'}
             value={text}
             onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
      />
      <div className="send-options-wrapper">
        {/*// TODO: BUTTON TO SEND IMAGE ATTACHED TO THE MESSAGE*/}

        {/*<Image image={FileUpload} type={ImageType.ICON} />*/}
        {/*<input*/}
        {/*  type="file"*/}
        {/*  className={'send-image-input'}*/}
        {/*  id={'file'}*/}
        {/*  name="image-sender"*/}
        {/*  onChange={handleInputFile}*/}
        {/*/>*/}
        {/*<label htmlFor="file">*/}
        {/*  <img src={ImageUpload} alt="Add Avatar" className={'add-avatar-img'} />*/}
        {/*</label>*/}
        <Button text={'Send'} onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default ChatInput;
