import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import Text from '../atoms/Text';

import { AppError, ChatUser, ImageSize, ImageType, LoadingState, TextType, UserChatDocument } from '../../utils/types';
import Input from '../atoms/Input';
import {
  DEFAULT_CHECK_ICON,
  DEFAULT_CLEAR_ICON,
  DEFAULT_PLUS_ICON,
  DEFAULT_SEARCH_ICON,
  LOADING_INITIAL_VALUES,
} from '../../utils/consts';
import Button from '../atoms/Button';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import Image from '../atoms/Image';
import DefaultUserIcon from '../../assets/images/user.png';
import ErrorBlock from '../molecules/ErrorBlock';
import Loading from '../molecules/Loading';
import { FIREBASE } from '../../utils/firebase';
import { RootState, useAppSelector } from '../../store/redux/hooks';

import './modalAddUser.scss';

const ModalAddUser = () => {
  const { history: chatsHistory } = useAppSelector((state: RootState) => state.chats);
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { dispatchUI } = useContext<UIReducer>(UIContext);
  const [ userEmail, setUserEmail ] = useState<string>('');
  const [error, setError] = useState<AppError | null>(null);
  const [ usersFound, setUsersFound ] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<LoadingState>(LOADING_INITIAL_VALUES);

  const handleSearch = async (): Promise<void> => {
    setUsersFound([]);
    setLoading({ message: 'Searching user', visible: true });
    try {
      const users = await FIREBASE.getUsersByEmail(userEmail.toLowerCase());
      setError(null);
      setLoading({ message: '', visible: false });
      if (users.length === 0) {
        setError({ code: 0, message: 'User not found' });
      } else {
        setUsersFound(users);
        setError(null);
      }
    } catch (error) {
      setError({ code: 0, message: 'Error querying users' });
    }
  }

  const alreadyAdded = (userFoundUID: string): boolean =>
    chatsHistory.some((chat: UserChatDocument) => chat.userInfo.uid === userFoundUID)

  const handleSelection = async (selectedUser: ChatUser): Promise<void> => {
    setLoading({ message: 'Adding user', visible: true});
    const combinedID = currentUser.uid > selectedUser.uid ? currentUser.uid + selectedUser.uid : selectedUser.uid + currentUser.uid;
    try {
      await FIREBASE.addChatAndUsers(currentUser, selectedUser, combinedID);
      setLoading({ message: '', visible: false});
    } catch(error) {
      setLoading({ message: '', visible: false});
      setError({ code: 0, message: 'Error adding the user' })
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    e.code === 'Enter' && handleSearch();
  }

  const handleOnClose = (): void => {
    handleOnClear();
    dispatchUI({ type: 'RESET_MODAL'});
  }

  const handleOnClear = (): void => {
    setUserEmail('');
    setUsersFound([]);
  }

  return (
    <div className="modal-add-user-wrapper">
      <div className="modal-header-wrapper">
        <div className="modal-header">
          <Text type={TextType.HEADER}>Search User</Text>
        </div>
      </div>

      <div className="content">
        <div className="search-wrapper">
          <Input
            type={'email'}
            placeholder={'Search an user by email'}
            name={'findUser'}
            value={userEmail}
            handleOnChange={(e: ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
            handleOnKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
            style={{
              flex: 1,
              border: '1px solid #1565c0',
              color: '#212121',
              borderRadius: '.5rem'
            }}
          />
          <Image image={DEFAULT_SEARCH_ICON} type={ImageType.ICON} onClick={handleSearch} disabled={!userEmail} />
          <Image image={DEFAULT_CLEAR_ICON} type={ImageType.ICON} onClick={handleOnClear} disabled={!userEmail} />
        </div>

        <div className="result-wrapper">
          {
            usersFound.length > 0 && usersFound.map((userFound: ChatUser) =>
              <div className={'result-item-wrapper'} key={userFound.uid}>
                <div className={'user-wrapper'} key={userFound.uid}>
                  <Image image={userFound.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.BIG} />
                  <div className="user-chat-info">
                    <Text type={TextType.TITLE} color={'#1565c0'}>{userFound.displayName}</Text>
                  </div>
                </div>
                <div className="user-action-wrapper">
                  <Image image={alreadyAdded(userFound.uid) ? DEFAULT_CHECK_ICON : DEFAULT_PLUS_ICON}
                         type={ImageType.ICON} onClick={() => handleSelection(userFound)} disabled={alreadyAdded(userFound.uid)} />
                </div>
              </div>
            )
          }
          {
            error && <ErrorBlock text={error.message}/>
          }
        </div>

        <div className={'modal-action-wrapper'}>
          <Button text={'Close'} onClick={handleOnClose} />
        </div>

      </div>
      {
        loading.visible && <Loading message={loading.message} />
      }
    </div>
  );
}

export default ModalAddUser;
