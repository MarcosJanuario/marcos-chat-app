import React, { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import Text from '../atoms/Text';

import './modalAddUser.scss';
import { AppError, ChatUser, ImageSize, ImageType, TextType } from '../../utils/types';
import Input from '../atoms/Input';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../firebase';
import {
  CHATS_DOCUMENT,
  DEFAULT_CLOSE_ICON,
  USER_CHATS_DOCUMENT,
  USERS_DOCUMENT
} from '../../utils/consts';
import Button from '../atoms/Button';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import Image from '../atoms/Image';
import DefaultUserIcon from '../../assets/images/user.png';
import ErrorBlock from '../molecules/ErrorBlock';

const ModalAddUser = () => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { data: ui, dispatchUI } = useContext<UIReducer>(UIContext);
  const [ userEmail, setUserEmail ] = useState<string>('');
  const [error, setError] = useState<AppError | null>(null);
  const [ usersFound, setUsersFound ] = useState<ChatUser[]>([]);

  useEffect(() => {
    console.log('[UI MODAL MORE]: ', ui);
  }, [ui]);

  {/*// TODO: SINGLE SERVICE FOR FB METHODS*/}
  const handleSearch = async (): Promise<void> => {
    let tempUsers: ChatUser[] = [];
    const q =
      query(collection(db, USERS_DOCUMENT),
        where('email', '==', userEmail));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log('[doc.data()]: ', doc.data());
        tempUsers.push(doc.data() as ChatUser);
      });
      setError(null);
    } catch (error) {
      console.log('[ERROR QUERING USERS]: ', { code: 0, message: 'Error querying users' });
      setError({ code: 0, message: 'Error querying users' });
    }
    console.log('[tempUsers]: ', tempUsers);
    if (tempUsers.length === 0) {
      setError({ code: 0, message: 'No user with this email found' })
    } else {
      setUsersFound(tempUsers);
      setError(null)
    }
  }

  const handleSelection = async (selectedUser: ChatUser): Promise<void> => {
    const combinedID = currentUser.uid > selectedUser.uid ? currentUser.uid + selectedUser.uid : selectedUser.uid + currentUser.uid;

    try {
      const resChats = await getDoc(doc(db, 'chats', combinedID));

      if (!resChats.exists()) {
        // create a new chats collection that will contain the whole conversation with each user
        await setDoc(doc(db, CHATS_DOCUMENT, combinedID), { messages: [] });

        // create/update userChats, where this will hold all the chats the SELECTED user is having with
        await updateDoc(doc(db, USER_CHATS_DOCUMENT, selectedUser.uid), {
          [combinedID + '.userInfo']: {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            ...(currentUser.photoURL && { photoURL: currentUser.photoURL })
          },
          [combinedID + '.date']: serverTimestamp()
        });

        // create/update userChats, where this will hold all the chats the LOGGEDIN user is having with
        await updateDoc(doc(db, USER_CHATS_DOCUMENT, currentUser.uid), {
          [combinedID + '.userInfo']: {
            uid: selectedUser.uid,
            email: selectedUser.email,
            displayName: selectedUser.displayName,
            ...(selectedUser.photoURL && { photoURL: selectedUser.photoURL })
          },
          [combinedID + '.date']: serverTimestamp()
        })
      }
    } catch(error) {
      console.log('ERROR BY HANDLING CHATS: ', error);
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.code === 'Enter' && handleSearch();
  }

  const handleOnClose = (): void => {
    setUserEmail('');
    setUsersFound([]);
    dispatchUI({ type: 'RESET_MODAL'});
  }

  return (
    <div className="modal-add-user-wrapper">
      <div className={'modal-action-wrapper'}>
        <Image image={DEFAULT_CLOSE_ICON} type={ImageType.ICON} onClick={handleOnClose} />
      </div>
      <div className="modal-header">
        <Text type={TextType.HEADER}>Add User</Text>
      </div>

      <div className="content">
        <div className="search-wrapper">
          <Input
            type={'text'}
            placeholder={'Search an user by email'}
            name={'findUser'}
            value={userEmail}
            handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
            handleOnKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
            style={{ width: '60%',
              height: '1rem',
              border: '1px solid #1565c0',
              color: '#212121',
              borderRadius: '.5rem'
            }}
          />
          <Button text={'Search'} onClick={handleSearch}
                  style={{ padding: '.5rem 0', width: '30%', borderRadius: '.5rem '}}/>
        </div>

        <div className="result-wrapper">
          {
            usersFound.length > 0 && usersFound.map((userFound: ChatUser) =>
              <>
                <div className={'user-wrapper'}>
                  <Image image={userFound.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.BIG} />
                  <div className="user-chat-info">
                    <Text type={TextType.TITLE} color={'#1565c0'}>{userFound.displayName}</Text>
                  </div>
                </div>
                <div className="user-action-wrapper">
                  <Button text={'Add'} onClick={() => handleSelection(userFound)} />
                </div>
              </>
            )
          }
          {
            error && <ErrorBlock text={error.message}/>
          }
        </div>

      </div>
    </div>
  );
}

export default ModalAddUser;
