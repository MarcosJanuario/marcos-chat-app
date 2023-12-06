import React, { FormEvent, ChangeEvent, useState } from 'react';
import './register.scss';
import AddAvatar from '../../assets/images/add-avatar.png';
import Button from '../../components/Button/Button';
import { createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { auth, db, storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore";

type FormData = {
  displayName: string;
  email: string;
  password: string;
  file: Blob | Uint8Array | ArrayBuffer | string;
}

const FORM_DATA_INITIAL_VALUES: FormData = {
  displayName: '',
  email: '',
  password: '',
  file: '',
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>(FORM_DATA_INITIAL_VALUES);
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    signupUser();
  };

  const signupUser = (): void => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log('[SIGNING IN SUCCESS]:', userCredential);
        const user = userCredential.user;
        handleImageUpload(userCredential.user as User, formData.file as Blob | Uint8Array | ArrayBuffer)
      })
      .catch((error) => {
        setError(true);
        console.log('[ERROR SIGNING IN]:', error);
      });
  }

  const handleImageUpload = (user: User, file: Blob | Uint8Array | ArrayBuffer): void => {
    const storageRef = ref(storage, formData.displayName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
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
      (error) => {
        setError(true);
        console.log('[ERROR LOADING IMAGE]:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string): void => {
          console.log('[File available at]', downloadURL);
          updateProfile(user as User, {
            displayName: user.displayName,
            photoURL: downloadURL
          }).then(() => {
            console.log('user profile updated sucessfully...');
            saveUserInformation(user as User, downloadURL);
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
      </div>
    </div>
  );
};

export default Register;
