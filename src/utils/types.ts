
import {Timestamp } from 'firebase/firestore';

export type RegisterFormData = {
  displayName: string;
  email: string;
  password: string;
  file: Blob | Uint8Array | ArrayBuffer | string;
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
  userInfo: ChatUser;
};

export type FileType = Blob | Uint8Array | ArrayBuffer;

export type MessageChat = {
  id: string;
  text: string;
  senderID: string;
  date: Timestamp;
}
