import { LoadingState } from './types';
import DefaultUserIcon from '../assets/images/user-avatar.png';

export const LOADING_INITIAL_VALUES: LoadingState = {
  message: '',
  visible: false
};


export const CHATS_DOCUMENT = 'chats';
export const USERS_DOCUMENT = 'users';
export const USER_CHATS_DOCUMENT = 'userChats';

export const PASSWORD_MIN_CHARS = 7;

export const DEFAULT_USER_AVATAR = DefaultUserIcon;
