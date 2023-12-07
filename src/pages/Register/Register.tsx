import React, { FormEvent, ChangeEvent, useState } from 'react';
import './register.scss';
import AddAvatar from '../../assets/images/add-avatar.png';
import Button from '../../components/Button/Button';
import { createUserWithEmailAndPassword, updateProfile, User, UserCredential } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL, StorageError } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";

import { FormData, AppError, LoadingState } from '../../utils/types';
import Loading from '../../components/loading/Loading';

const FORM_DATA_INITIAL_VALUES: FormData = {
  displayName: '',
  email: '',
  password: '',
  file: '',
}

const ERROR_INITIAL_VALUES: AppError = null;
const LOADING_INITIAL_VALUES: LoadingState = {
  message: '',
  visible: false
};

const Register = () => {
  const [formData, setFormData] = useState<FormData>(FORM_DATA_INITIAL_VALUES);
  const [error, setError] = useState<AppError | null>(ERROR_INITIAL_VALUES);
  const [loading, setLoading] = useState<LoadingState>(LOADING_INITIAL_VALUES);
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoadingState = (name: keyof LoadingState | Partial<LoadingState>, value?: LoadingState[keyof LoadingState]): void => {
    if (typeof name === 'string') {
      setLoading((prevData: LoadingState) => ({ ...prevData, [name]: value }));
    } else {
      setLoading((prevData: LoadingState) => ({ ...prevData, ...name }));
    }
  };


  const clearError = (): void => {
    setError(ERROR_INITIAL_VALUES);
  };

  const handleSubmit = (event: FormEvent): void => {
    console.log('handleSubmit...');
    handleLoadingState({ message: 'Creating new user', visible: true });
    event.preventDefault();
    signupUser();
  };

  const signupUser = (): void => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential: UserCredential) => handleImageUpload(userCredential.user as User, formData.file as Blob | Uint8Array | ArrayBuffer))
      .then(() => clearError())
      .catch((error) => setError({ code: error.code, message: error.message }));
  }

  const handleImageUpload = (user: User, file: Blob | Uint8Array | ArrayBuffer): void => {
    handleLoadingState('message', 'Uploading user\'s image avatar');
    const storageRef = ref(storage, formData.displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot): void => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running...');
            break;
        }
      },
      (error: StorageError) => setError({ code: Number(error.code), message: error.message }),
      (): void => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string): void => {
          updateProfile(user as User, {
            displayName: user.displayName,
            photoURL: downloadURL
          })
          .then((): Promise<void> => {
            handleLoadingState('message', 'Saving user\'s information');
            return saveUserInformation(user as User, downloadURL);
          })
          .then((): void => {
            clearError();
            handleLoadingState({ message: '', visible: false });
          })
          .catch((error): void => {
            setError({ code: error.code, message: error.message });
            handleLoadingState({ message: '', visible: false });
          })
        });
      }
    );
  }

  const saveUserInformation = async (user: User, downloadURL: string): Promise<void> => {
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      displayName: formData.displayName,
      email: formData.email,
      photoURL: downloadURL
    });
  }

  return (
    <div className={'register-wrapper'}>
      <div className={'register-form-container'}>
        <span className={'logo register-font-color'}>Marcos Chat App</span>
        <span className={'title register-font-color'}>Register</span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={'Display Name'}
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder={'Email'}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder={'Password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            type="file"
            className={'register-input-avatar'}
            id={'file'}
            name="avatar"
            onChange={handleChange}
          />
          <label htmlFor="file">
            <img src={AddAvatar} alt="Add Avatar" className={'add-avatar-img'} />
            <span>Add avatar</span>
          </label>
          <Button text={'Sign up'} onClick={() => console.log('button clicked')} />
          {/*//TODO: improve later*/}
          {
            error && <span>Ops! Something went wrong!</span>
          }
        </form>
        <p>Do you have an account? Please login</p>
        {
          loading.visible && <Loading loading={loading} />
        }
      </div>
    </div>
  );
};

export default Register;
