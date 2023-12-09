import React, { useContext } from 'react';
import Avatar from '../../avatar/Avatar';
import { ImageSize } from '../../../utils/types';

import './message.scss';
import { AuthContext, AuthContextType } from '../../../store/context/AuthContext';
import { ChatContext, ChatReducer } from '../../../store/context/ChatContext';

type messageProps = {
  message: string;
}

const Message = ({ message }: messageProps) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);
  const { data } = useContext<ChatReducer>(ChatContext);

  return (
    <div className="message-wrapper owner">
      {/*<div className="message-info-wrapper">*/}
      {/*  <Avatar*/}
      {/*    image={'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="message image'}*/}
      {/*    size={ImageSize.NORMAL}*/}
      {/*  />*/}
      {/*  <span>just now</span>*/}
      {/*</div>*/}

      {/*<div className="message-content-wrapper">*/}
      {/*  <p>{ message }</p>*/}
      {/*  <img src="https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>*/}
      {/*</div>*/}
    </div>
  );
}

export default Message;
