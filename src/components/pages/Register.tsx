import React, { ChangeEvent, FormEvent, useState } from 'react';
import './register.scss';
import Button from '../atoms/Button';
import { createUserWithEmailAndPassword, updateProfile, User, UserCredential } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { getDownloadURL, ref, StorageError, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import {
  AppError,
  ImageSize,
  ImageType,
  LoadingState,
  RegisterFormData,
  RegisterInputField,
  TextType
} from '../../utils/types';
import Loading from '../molecules/Loading';
import { Link, useNavigate } from 'react-router-dom';
import {
  DEFAULT_CHECK_ICON,
  DEFAULT_USER_AVATAR,
  IMAGE_FILE_SIZE,
  LOADING_INITIAL_VALUES,
  PASSWORD_MIN_CHARS,
  REGISTER_INPUT_FIELDS,
  USER_CHATS_DOCUMENT,
  USERS_DOCUMENT
} from '../../utils/consts';
import { validateEmail } from '../../utils/helpers';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import Image from '../atoms/Image';

const FORM_DATA_INITIAL_VALUES: RegisterFormData = {
  displayName: '',
  email: '',
  password: '',
  passwordRepeat: '',
  file: '',
}

const Register = () => {
  const [formData, setFormData] = useState<RegisterFormData>(FORM_DATA_INITIAL_VALUES);
  const [error, setError] = useState<AppError | null>(null);
  const [loading, setLoading] = useState<LoadingState>(LOADING_INITIAL_VALUES);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;

    if (name === 'avatar' && files && files.length > 0) {
      const file = files[0];

      if (file.size <= IMAGE_FILE_SIZE) {
        setFormData((prevData) => ({ ...prevData, file: file }));
        clearError();
      } else {
        setError({ code: 0, message: 'File size exceeds the limit of 1MB.' });
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleLoadingState = (name: keyof LoadingState | Partial<LoadingState>, value?: LoadingState[keyof LoadingState]): void => {
    if (typeof name === 'string') {
      setLoading((prevData: LoadingState) => ({ ...prevData, [name]: value }));
    } else {
      setLoading((prevData: LoadingState) => ({ ...prevData, ...name }));
    }
  };


  const clearError = (): void => {
    setError(null);
  };

  const resetLoading = (): void => handleLoadingState({ message: '', visible: false });

  const handleSubmit = (event: FormEvent): void => {
    handleLoadingState({ message: 'Creating new user', visible: true });
    event.preventDefault();
    signupUser();
  };

  const errorHandler = (error: any): void => {
    setError({ code: error?.code ?? 0, message: error?.message ?? 'Error by creating new user' });
    resetLoading();
  }

  const signupUser = (): void => {
    console.log('formData: ', formData);
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential: UserCredential) => updateDisplayName(userCredential.user))
      .then((user: User) => formData.file
        ? uploadUserAvatar(user, formData.file as Blob | Uint8Array | ArrayBuffer)
        : saveUserDatabaseInformation(user))
      .then(() => clearError())
      .catch(errorHandler);
  }

  const updateDisplayName = async (user: User): Promise<User> => {
    await updateProfile(user, { displayName: formData.displayName })
      .then(() => {
      }).catch(errorHandler)
    return user;
  }

  const uploadUserAvatar = (user: User, file: Blob | Uint8Array | ArrayBuffer): void => {
    const storageRef = ref(storage, `${user.displayName}:${formData.email}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot): void => {
        switch (snapshot.state) {
          case 'paused':
            break;
            //TODO: loading bar in the loading page
          case 'running':
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
          .then((): void => {
            saveUserDatabaseInformation(user as User, downloadURL).then(() => clearError());
          })
          .catch((error): void => {
            setError({ code: error.code, message: error.message });
            resetLoading();
          })
        });
      }
    );
  }

  const saveUserDatabaseInformation = async (user: User, downloadURL?: string): Promise<void> => {
    await setDoc(doc(db, USERS_DOCUMENT, user.uid), {
      uid: user.uid,
      displayName: formData.displayName,
      email: formData.email,
      ...(downloadURL && { photoURL: downloadURL }),
    });

    await setDoc(doc(db, USER_CHATS_DOCUMENT, user.uid), {});
    resetLoading();
    navigate('/');
  }

  const passwordsAreCorrect = (): boolean => {
    return formData.password.length > PASSWORD_MIN_CHARS
      && formData.passwordRepeat.length > PASSWORD_MIN_CHARS
      && formData.password === formData.passwordRepeat
  }

  const fieldsCorrectlyFulfilled = (): boolean => passwordsAreCorrect() && validateEmail(formData.email);

  return (
    <div className={'register-wrapper'}>
      <div className={'register-form-container'}>
        <Text type={TextType.HEADER}>Marcos Chat App</Text>
        <Text type={TextType.SMALL}>Register</Text>
        <form onSubmit={handleSubmit}>
          {
            REGISTER_INPUT_FIELDS.map((inputField: RegisterInputField) => (
              <Input
                key={inputField.id}
                type={inputField.type}
                placeholder={inputField.placeholder}
                name={inputField.name}
                value={formData[inputField.name as keyof RegisterFormData] as string}
                handleOnChange={handleChange}
              />
            ))
          }

          <input
            type="file"
            style={{ display: 'none' }}
            className={'register-input-avatar'}
            id={'add-avatar-file'}
            name="avatar"
            onChange={handleChange}
            accept=".jpg, .jpeg, .png"
          />
          <div className={'add-avatar-wrapper'}>
            <div className={'add-avatar-button-wrapper'}>
              <label htmlFor="add-avatar-file">
                <Image image={DEFAULT_USER_AVATAR} type={ImageType.ICON} />
                <span>Add avatar</span>
              </label>
            </div>
            {
              formData.file &&
              <Image image={DEFAULT_CHECK_ICON} type={ImageType.ICON} size={ImageSize.SMALL} />
            }
          </div>

          <Button text={'Sign up'} disabled={!fieldsCorrectlyFulfilled()} />

          {
            error &&
            error && <Text type={TextType.ERROR}>{error.message}</Text>
          }

        </form>

        <p>Do you have an account? Please <Link to={'/login'}>login</Link></p>

        {
          loading.visible && <Loading message={loading.message} />
        }
      </div>
    </div>
  );
};

export default Register;
