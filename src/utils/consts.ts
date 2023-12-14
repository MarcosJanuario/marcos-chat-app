import { LoadingState, RegisterInputField, SizeMap } from './types';
import DefaultUserIcon from '../assets/images/user-avatar.png';
import DefaultCheckIcon from '../assets/images/check.png';
import DefaultSearchIcon from '../assets/images/search.png';
import DefaultClearIcon from '../assets/images/clear.png';
import DefaultPlusIcon from '../assets/images/plus.png';

export const LOADING_INITIAL_VALUES: LoadingState = {
  message: '',
  visible: false
};


export const CHATS_DOCUMENT = 'chats';
export const USERS_DOCUMENT = 'users';
export const USER_CHATS_DOCUMENT = 'userChats';

export const PASSWORD_MIN_CHARS = 7;

export const MAX_STRING_CHARS = 17;

export const DEFAULT_USER_AVATAR = DefaultUserIcon;
export const DEFAULT_CHECK_ICON = DefaultCheckIcon;
export const DEFAULT_SEARCH_ICON = DefaultSearchIcon;
export const DEFAULT_CLEAR_ICON = DefaultClearIcon;
export const DEFAULT_PLUS_ICON = DefaultPlusIcon;

const convertSizeStringToBytes = (sizeString: string): number => {
  const sizeNumber = parseFloat(sizeString);

  const unit = sizeString.slice(-2).toUpperCase();

  const sizeMap: SizeMap = {
    'KB': 1024,
    'MB': 1024 * 1024,
    'GB': 1024 * 1024 * 1024,
    'TB': 1024 * 1024 * 1024 * 1024,
  };

  return sizeNumber * (sizeMap[unit] || 1);
}

export const IMAGE_FILE_SIZE = convertSizeStringToBytes('1MB');

export const REGISTER_INPUT_FIELDS: RegisterInputField[] = [
  {
    id: '1',
    type: 'text',
    placeholder: 'Display Name',
    name: 'displayName',
    value: 'displayName',
  },
  {
    id: '2',
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    value: 'email',
  },
  {
    id: '3',
    type: 'password',
    placeholder: 'Password with at least 8 characters',
    name: 'password',
    value: 'password',
  },
  {
    id: '4',
    type: 'password',
    placeholder: 'Repeated Password',
    name: 'passwordRepeat',
    value: 'passwordRepeat',
  },
];

