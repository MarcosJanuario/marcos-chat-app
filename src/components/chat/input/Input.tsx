import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import Icon from '../../icon/Icon';
import FileUpload from '../../../assets/images/send-file.png';
import ImageUpload from '../../../assets/images/send-image.png';

import Button from '../../Button/Button';
import { ChatContext, ChatReducer } from '../../../store/context/ChatContext';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import { AppError, FileType } from '../../../utils/types';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../firebase';
import { CHATS_DOCUMENT } from '../../../utils/consts';
import { v4 as uuid } from 'uuid';

import './input.scss';
import { updateProfile, User } from 'firebase/auth';

const Input = () => {
  const { data } = useContext<ChatReducer>(ChatContext);
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const [text, setText] = useState<string>('');
  const [image, setImage ] = useState<FileType | null>(null);
  const [error, setError] = useState<AppError | null>(null);

  const handleSendMessage = async (): Promise<void> => {
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
            })
            .catch((error) => {
              console.log('[ERROR GETTING IMAGE URL]: ', error);
              setError({ code: error.code, message: error.message });
            })
        }
      );
    } else {
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
      <input type="text" placeholder={'Find an user'}
             onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleSendMessage}
             value={text}
             onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <div className="send-options-wrapper">
        <Icon image={FileUpload} />
        <input
          type="file"
          className={'send-image-input'}
          id={'file'}
          name="image-sender"
          onChange={handleInputFile}
        />
        <label htmlFor="file">
          <img src={ImageUpload} alt="Add Avatar" className={'add-avatar-img'} />
        </label>
        <Button text={'Send'} onClick={handleSendMessage} />
      </div>
    </div>
  );
}

export default Input;
