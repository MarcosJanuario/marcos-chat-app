import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

import './search.scss';
import Avatar from '../../avatar/Avatar';
import { AppError, FirebaseDocUser, ImageSize } from '../../../utils/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../firebase';
import User from '../../../assets/images/user.png';

const Search = () => {
  const [ userName, setUserName ] = useState('');
  const [ users, setUsers ] = useState<FirebaseDocUser[]>([]);
  const [error, setError] = useState<AppError | null>(null);

  const handleSearch = async (): Promise<void> => {
    let tempUsers: FirebaseDocUser[] = [];
    const q =
      query(collection(db, 'users'),
        where('displayName', '==', userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempUsers.push(doc.data() as FirebaseDocUser);
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

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log('ONCHANGE...: ', e.target.value);
    setUserName(e.target.value);
  }

  return (
    <div className="search-wrapper">
      <div className="search-form">
        <input type="text" placeholder={'Find an user'}
               onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
               onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)}
        />
      </div>

      {
        users && users.length > 0 &&
          users?.map((user: FirebaseDocUser) => <div key={user.uid} className="user-chat">
            <Avatar image={user?.photoURL ?? User}
                    size={ImageSize.BIG}
            />
            <div className="user-chat-info">
              <span>{ user.displayName ?? '' }</span>
            </div>
          </div>)
      }
      {
        error && <div className={'error-wrapper'}>
          <span className="error-message">{error.message}</span>
        </div>
      }
    </div>
  );
}

export default Search;
