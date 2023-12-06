import React from 'react';

import './search.scss';
import Avatar from '../../avatar/Avatar';
import { AvatarSize } from '../../../utils/types';

const Search = () => {
  return (
    <div className="search-wrapper">
      <div className="search-form">
        <input type="text" placeholder={'Find an user'}/>
      </div>

      <div className="user-chat">
        <Avatar
          image={'https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          size={AvatarSize.BIG}
        />
        <div className="user-chat-info">
          <span>Olga</span>
        </div>
      </div>
    </div>
  );
}

export default Search;
