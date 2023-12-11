import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile, User,
  UserCredential
} from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { ChatUser, MessageChat, UserChatDocument } from './types';
import { CHATS_DOCUMENT, USER_CHATS_DOCUMENT, USERS_DOCUMENT } from './consts';

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
            .filter((chat: UserChatDocument) => chat.userInfo)
            .sort((a, b) => (b.date?.seconds || 0) - (a.date?.seconds || 0));

          callback(sortedUserChats);
        }
      }
    );

    return unsubscribe;
  },
  getChatMessages: (
    chatID: string,
    callback: (messages: MessageChat[]) => void
  ): (() => void) => {
    const docRef = doc(db, CHATS_DOCUMENT, chatID);
    const unsubscribe = onSnapshot(
      docRef,
      (doc: any) => {
        if (doc.exists()) {
          const messagesData = doc.data()?.messages;
          const messagesArray: MessageChat[] = messagesData ? (messagesData as MessageChat[]) : [];
          callback(messagesArray);
        }
      }
    );

    return unsubscribe;
  },
  getUsersByEmail: async (email: string): Promise<ChatUser[]> => {
    const users: ChatUser[] = [];
    const q = query(collection(db, USERS_DOCUMENT), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      users.push(doc.data() as ChatUser);
    });
    return users;
  },
  addChatAndUsers: async (
    currentUser: User,
    selectedUser: ChatUser,
    combinedID: string
  ): Promise<void> => {
    try {
      const resChats = await getDoc(doc(db, CHATS_DOCUMENT, combinedID));

      if (!resChats.exists()) {
        // create a new chats collection that will contain the whole conversation with each user
        await setDoc(doc(db, CHATS_DOCUMENT, combinedID), { messages: [] });

        // update userChats, where this will hold all the chats the SELECTED user is having with
        await updateDoc(doc(db, USER_CHATS_DOCUMENT, selectedUser.uid), {
          [combinedID + '.userInfo']: {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            ...(currentUser.photoURL && { photoURL: currentUser.photoURL }),
          },
          [combinedID + '.date']: serverTimestamp(),
        });

        // update userChats, where this will hold all the chats the LOGGEDIN user is having with
        await updateDoc(doc(db, USER_CHATS_DOCUMENT, currentUser.uid), {
          [combinedID + '.userInfo']: {
            uid: selectedUser.uid,
            email: selectedUser.email,
            displayName: selectedUser.displayName,
            ...(selectedUser.photoURL && { photoURL: selectedUser.photoURL }),
          },
          [combinedID + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      throw new Error('Error adding the user');
    }
  },
}
