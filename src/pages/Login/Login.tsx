import React from 'react';
import './login.scss';

const Login = () => {
  return (
    <div className={'login-wrapper'}>
      <div className={'login-form-container'}>
        <span className={'logo login-font-color'}>Marcos Chat App</span>
        <span className={'title login-font-color'}>Login</span>
        <form>
          <input type="text" placeholder={'Display Name'}/>
          <input type="email" placeholder={'Email'}/>
          <button>Login</button>
        </form>
        <p>Don't you have an account? Please Register</p>
      </div>
    </div>
  );
}

export default Login;

