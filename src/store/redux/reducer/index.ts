import { combineReducers } from 'redux';

import permissionsReducer from './permissions';
import chatsReducer from './chats';

const rootReducer = combineReducers({
  permissions: permissionsReducer,
  chats: chatsReducer
});

export default rootReducer;
