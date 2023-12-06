import React from 'react';
import './register.scss';
import AddAvatar from '../../assets/images/add-avatar.png';

const Register = () => {
  return (
    <div className={'register-wrapper'}>
      <div className={'register-form-container'}>
        <span className={'logo register-font-color'}>Marcos Chat App</span>
        <span className={'title register-font-color'}>Register</span>
        <form>
          <input type="text" placeholder={'Display Name'}/>
          <input type="email" placeholder={'Email'}/>
          <input type="password" placeholder={'Password'}/>
          <input type="file" className={'register-input-avatar'} id={'file'}/>
          <label htmlFor="file">
            <img src={AddAvatar} alt="Add Avatar" className={'add-avatar-img'}/>
            <span>Add avatar</span>
          </label>
          <button>Sign up</button>
        </form>
        <p>Do you have an account? Please login</p>
      </div>
    </div>
  );
}

export default Register;

