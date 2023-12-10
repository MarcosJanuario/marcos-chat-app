import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';

import './userChatsSearch.scss';
import { AppError, ChatUser } from '../../utils/types';
import { collection, doc, getDoc, getDocs, query, setDoc, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import { CHATS_DOCUMENT, USER_CHATS_DOCUMENT, USERS_DOCUMENT } from '../../utils/consts';
import ChatThumbnail from '../molecules/ChatThumbnail';
import Input from '../atoms/Input';

const UserChatsSearch = () => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const [ userName, setUserName ] = useState('');
  const [ users, setUsers ] = useState<ChatUser[]>([]);
  const [error, setError] = useState<AppError | null>(null);

  const handleSearch = async (): Promise<void> => {
    let tempUsers: ChatUser[] = [];
    const q =
      query(collection(db, USERS_DOCUMENT),
        where('displayName', '==', userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempUsers.push(doc.data() as ChatUser);
      });
      setError(null);
    } catch (error) {
      console.log('[ERROR QUERING USERS]: ', { code: 0, message: 'Error querying users' });
      setError({ code: 0, message: 'Error querying users' });
    }
    setUsers(tempUsers);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
   e.code === 'Enter' && handleSearch();
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

    setUsers([]);
    setUserName('');
  }

  return (
    <div className="search-wrapper">
      <div className="search-form">
        <Input
          type={'text'}
          placeholder={'Find an user'}
          name={'findUser'}
          value={userName}
          handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
          handleOnKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
        />
      </div>

      {
        users && users.length > 0 &&
          users?.map((user: ChatUser) =>
            <div key={user.uid}>
              <ChatThumbnail userInfo={user} onClick={(user: ChatUser) => handleSelection(user)} />
            </div>
          )
      }
      {
        error && <div className={'error-wrapper'}>
          <span className="error-message">{error.message}</span>
        </div>
      }
    </div>
  );
}

export default UserChatsSearch;
