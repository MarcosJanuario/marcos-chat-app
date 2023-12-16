import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { UserCredential } from 'firebase/auth';

import './login.scss';
import Button from '../atoms/Button';
import { AppError, LoadingState, LoginFormData, TextType } from '../../utils/types';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../molecules/Loading';
import { LOADING_INITIAL_VALUES, PASSWORD_MIN_CHARS } from '../../utils/consts';
import { validateEmail } from '../../utils/helpers';
import Input from '../atoms/Input';
import Text from '../atoms/Text';
import ErrorBlock from '../molecules/ErrorBlock';
import { FIREBASE } from '../../utils/firebase';

const LOGIN_FORM_DATA_INITIAL_VALUES: LoginFormData = {
  email: '',
  password: ''
}

const Login: FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>(LOGIN_FORM_DATA_INITIAL_VALUES);
  const [loading, setLoading] = useState<LoadingState>(LOADING_INITIAL_VALUES);
  const [error, setError] = useState<AppError | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (validateEmail(formData.email)) {
      loginUser();
    }
  };

  const handleLoginSuccess = (): void => {
    setLoading((prevData: LoadingState) => ({ visible: false, message: '' }));
    navigate('/');
  }

  const handleLoginError = (error: any): void => {
    setLoading(LOADING_INITIAL_VALUES);
    setError({ code: error?.code ?? 0, message: error?.message ?? '' });
  }

  const loginUser = (): void => {
    setLoading((prevData: LoadingState) => ({ visible: true, message: 'Logging user' }));
    FIREBASE.doLogin(formData.email, formData.password)
      .then((userCredential: UserCredential) => handleLoginSuccess)
      .catch((error) => handleLoginError(error));
  }

  const fieldsCorrectlyFulfilled = (): boolean =>
    !!formData.email && formData.password.length > PASSWORD_MIN_CHARS
    && validateEmail(formData.email);

  return (
    <div className={'login-wrapper'}>
      <div className={'login-form-container'}>
        <Text type={TextType.HEADER}>Marcos Chat App</Text>
        <Text type={TextType.SMALL}>Login</Text>
        <form onSubmit={handleSubmit}>
          <Input
            type={'email'}
            placeholder={'Email'}
            name={'email'}
            value={formData.email}
            handleOnChange={handleChange} />
          <Input
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            value={formData.password}
            handleOnChange={handleChange} />
          <Button text={'Login'} disabled={!fieldsCorrectlyFulfilled()} />
          {
            error && <ErrorBlock text={error.message} />
          }
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

