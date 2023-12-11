import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { ChatUser, UserChatDocument } from './types';
import { USER_CHATS_DOCUMENT } from './consts';

export const FIREBASE = {
  doLogin: (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  },
  createUser: (email: string, password: string): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  },
  updateProfile: async (user: any, profile: { displayName?: string; photoURL?: string }): Promise<void> => {
    await updateProfile(user, profile);
  },
  getDownloadURL: async (ref: any): Promise<string> => {
    return await getDownloadURL(ref);
  },
  setDoc: async (docRef: any, data: any): Promise<void> => {
    await setDoc(docRef, data);
  },
  uploadFileToStorage: async (user: any, file: Blob | Uint8Array | ArrayBuffer): Promise<string> => {
    const storageRef = ref(storage, `${user.displayName}:${user.email}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    try {
      await new Promise<void>((resolve, reject) => {
        uploadTask.on('state_changed', (snapshot) => {}, reject, resolve);
      });

      return await FIREBASE.getDownloadURL(uploadTask.snapshot.ref);
    } catch (error: any) {
      throw new Error(`Error uploading file: ${error.message}`);
    }
  },
  getUserChats: (
    currentUser: ChatUser,
    callback: (userChats: UserChatDocument[]) => void
  ): (() => void) => {
    const docRef = doc(db, USER_CHATS_DOCUMENT, currentUser.uid);
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot: any) => {
        if (snapshot.exists()) {
          const userChatsDocument = snapshot.data();
          const userChatsArray: UserChatDocument[] = Object.values(userChatsDocument).map(
            (value: any) => ({
              date: value.date,
              lastMessage: value.lastMessage,
              userInfo: value.userInfo
            })
          );

          const sortedUserChats: UserChatDocument[] = userChatsArray
            .filter((chat) => chat.userInfo) // Remove invalid chats
            .sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0));

          callback(sortedUserChats);
        }
      }
    );

    return unsubscribe;
  }
}
