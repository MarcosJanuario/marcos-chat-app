import React, { FC, useContext } from 'react';
import { MessageChat } from '../../utils/types';

import { AuthContext, AuthContextType } from '../../store/context/AuthContext';

import './balloonText.scss';

type BalloonTextProps = {
  message: MessageChat;
}

const BalloonText: FC<BalloonTextProps> = ({ message }) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const messageFromLoggedUser = (): boolean => message.senderID === currentUser.uid;

  return (
    <div className="balloon-text-wrapper">
      <p className={`${messageFromLoggedUser() ? 'owner' : 'from-other'}`}>{ message.text }</p>
      { message.image && <img src={message.image} alt={'user attached image'}/> }
    </div>
  );
}

export default BalloonText;
