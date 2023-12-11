import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, updateProfile,
  UserCredential
} from 'firebase/auth';
import { auth, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { setDoc } from 'firebase/firestore';

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
}
