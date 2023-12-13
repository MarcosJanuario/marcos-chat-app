import { createStore } from '@reduxjs/toolkit';
import rootReducer from './redux/reducer';

const store = createStore(rootReducer);

export default store;
