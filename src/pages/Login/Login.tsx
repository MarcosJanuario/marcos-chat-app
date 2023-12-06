import React from 'react';
import './login.scss';
import Button from '../../components/Button/Button';

const Login = () => {
  return (
    <div className={'login-wrapper'}>
      <div className={'login-form-container'}>
        <span className={'logo login-font-color'}>Marcos Chat App</span>
        <span className={'title login-font-color'}>Login</span>
        <form>
          <input type="text" placeholder={'Display Name'}/>
          <input type="email" placeholder={'Email'}/>
          <Button text={'Login'} onClick={() => console.log('button clicked')} />
        </form>
        <p>Don't you have an account? Please Register</p>
      </div>
    </div>
  );
}

export default Login;

