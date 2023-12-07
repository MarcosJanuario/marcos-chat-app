import React, { ChangeEvent, FormEvent, useState } from 'react';
import './login.scss';
import Button from '../../components/Button/Button';
import { LoginFormData } from '../../utils/types';

const LOGIN_FORM_DATA_INITIAL_VALUES: LoginFormData = {
  email: '',
  password: ''
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>(LOGIN_FORM_DATA_INITIAL_VALUES);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    console.log('login in...');
  };

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
        <p>Don't you have an account? Please Register</p>
      </div>
    </div>
  );
}

export default Login;

