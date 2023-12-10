
import {Timestamp } from 'firebase/firestore';

export type RegisterFormData = {
  displayName: string;
  email: string;
  password: string;
  passwordRepeat: string;
  file: Blob | Uint8Array | ArrayBuffer | string;
  [key: string]: string | Blob | Uint8Array | ArrayBuffer;
}

export type LoginFormData = {
  email: string;
  password: string;
}

export enum ImageSize {
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
  BIG = 'BIG',
}

export enum TextType {
  HEADER = 'header',
  BODY = 'body',
  SMALL = 'small',
  ERROR = 'error',
}

export type AppError = {
  code: number;
  message: string;
} | null;

export type LoadingState = {
  message: string;
  visible: boolean;
}

export type ChatUser = {
  displayName: string;
  email: string;
  photoURL?: string;
  uid: string;
}

export type DateInfo = {
  seconds: number;
  nanoseconds: number;
};

export type UserChatDocument = {
  date: DateInfo;
  lastMessage?: { text: string };
  userInfo: ChatUser;
};

export type FileType = Blob | Uint8Array | ArrayBuffer;

export type MessageChat = {
  id: string;
  text: string;
  senderID: string;
  date: Timestamp;
  image?: string;
}

export type SizeMap = {
  [key: string]: number;
};

export type RegisterInputField = {
  type: string;
  placeholder: string;
  name: string;
  value: string;
  className?: string;
  id?: string;
  accept?: string;
};

export enum ImageType {
  AVATAR,
  ICON
}
