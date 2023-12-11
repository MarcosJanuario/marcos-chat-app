import React, { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { UIContext, UIReducer } from '../../store/context/UIContext';
import Text from '../atoms/Text';

import { AppError, ChatUser, ImageSize, ImageType, LoadingState, TextType, UserChatDocument } from '../../utils/types';
import Input from '../atoms/Input';
import { DEFAULT_CLOSE_ICON, LOADING_INITIAL_VALUES, } from '../../utils/consts';
import Button from '../atoms/Button';
import { AuthContext, AuthContextType } from '../../store/context/AuthContext';
import Image from '../atoms/Image';
import DefaultUserIcon from '../../assets/images/user.png';
import ErrorBlock from '../molecules/ErrorBlock';
import Loading from '../molecules/Loading';
import { UserChatsContext, UserChatsReducer } from '../../store/context/UserChatsContext';
import { FIREBASE } from '../../utils/firebase';

import './modalAddUser.scss';

const ModalAddUser = () => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { dispatchUI } = useContext<UIReducer>(UIContext);
  const { data: userChats } = useContext<UserChatsReducer>(UserChatsContext);
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
        setError({ code: 0, message: 'No user with this email found' });
      } else {
        setUsersFound(users);
        setError(null);
      }
    } catch (error) {
      setError({ code: 0, message: 'Error querying users' });
    }
  }

  const alreadyAdded = (userFoundUID: string): boolean =>
    userChats.userChats.some((chat: UserChatDocument) => chat.userInfo.uid === userFoundUID)

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
        <div className={'modal-action-wrapper'}>
          <Image image={DEFAULT_CLOSE_ICON} type={ImageType.ICON} onClick={handleOnClose} />
        </div>
        <div className="modal-header">
          <Text type={TextType.HEADER}>Add User</Text>
        </div>
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
            style={{
              flex: 2,
              height: '1rem',
              border: '1px solid #1565c0',
              color: '#212121',
              borderRadius: '.5rem'
            }}
          />
          <div className={'h-spacing'}></div>
          <Button text={'Search'} onClick={handleSearch}
                  style={{ padding: '.5rem 0', width: '15%', flex: 1}}/>
          <div className={'h-spacing'}></div>
          <Button text={'Clear'} onClick={handleOnClear}
                  disabled={usersFound.length === 0}
                  style={{ padding: '.5rem 0', width: '15%', flex: 1}}/>
        </div>

        <div className="result-wrapper">
          {
            usersFound.length > 0 && usersFound.map((userFound: ChatUser) =>
              <>
                <div className={'user-wrapper'} key={userFound.uid}>
                  <Image image={userFound.photoURL ?? DefaultUserIcon} type={ImageType.AVATAR} size={ImageSize.BIG} />
                  <div className="user-chat-info">
                    <Text type={TextType.TITLE} color={'#1565c0'}>{userFound.displayName}</Text>
                  </div>
                </div>
                <div className="user-action-wrapper">
                  <Button
                    text={`${alreadyAdded(userFound.uid) ? 'Already Added' : 'Add'}`}
                    disabled={alreadyAdded(userFound.uid)}
                    onClick={() => handleSelection(userFound)}
                  />
                </div>
              </>
            )
          }
          {
            error && <ErrorBlock text={error.message}/>
          }
        </div>

      </div>
      {
        loading.visible && <Loading message={loading.message} />
      }
    </div>
  );
}

export default ModalAddUser;
