import { combineReducers } from 'redux';

import permissionsReducer from './permissions';

const rootReducer = combineReducers({
  permissions: permissionsReducer
});

export default rootReducer;
