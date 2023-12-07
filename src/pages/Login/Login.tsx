import React, { ChangeEvent, FormEvent, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './login.scss';
import Button from '../../components/Button/Button';
import { LoadingState, LoginFormData } from '../../utils/types';
import { auth } from '../../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { LOADING_INITIAL_VALUES } from '../../utils/consts';

const LOGIN_FORM_DATA_INITIAL_VALUES: LoginFormData = {
  email: '',
  password: ''
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>(LOGIN_FORM_DATA_INITIAL_VALUES);
  const [loading, setLoading] = useState<LoadingState>(LOADING_INITIAL_VALUES);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    console.log('login in...');
    loginUser();
  };

  const loginUser = (): void => {
    setLoading((prevData: LoadingState) => ({ visible: true, message: 'Logging user' }));
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log('USER LOGGED IN');
        setLoading((prevData: LoadingState) => ({ visible: false, message: '' }));
        navigate('/');
      })
      .catch((error) => {
        console.log('login error: ', error.message);
      });
  }

  return (
    <div className={'login-wrapper'}>
      <div className={'login-form-container'}>
        <span className={'logo login-font-color'}>Marcos Chat App</span>
        <span className={'title login-font-color'}>Login</span>
        <form onSubmit={handleSubmit}>
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
          <Button text={'Login'} />
        </form>
        <p>Don't you have an account? Please <Link to={'/register'}>Register</Link>.</p>
        {
          loading.visible && <Loading message={loading.message} />
        }
      </div>
    </div>
  );
}

export default Login;

