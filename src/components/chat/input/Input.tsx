import React from 'react';
import Icon from '../../icon/Icon';
import FileUpload from '../../../assets/images/send-file.png';
import ImageUpload from '../../../assets/images/send-image.png';

import './input.scss';
import Button from '../../Button/Button';

const Input = () => {
  return (
    <div className="input-wrapper">
      <input type="text" placeholder={'Type something...'}/>
      <div className="send-options-wrapper">
        <Icon image={FileUpload} />
        <Icon image={ImageUpload} />
        <Button text={'Send'} onClick={() => console.log('button clicked')} />
      </div>
    </div>
  );
}

export default Input;
