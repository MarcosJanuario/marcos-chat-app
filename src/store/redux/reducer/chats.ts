import { createSlice, Reducer } from '@reduxjs/toolkit';
import chatsActions, { ChatsState } from '../actions/chats';
import { ChatUser } from '../../../utils/types';

export const chatsInitialState = {
  history: [],
  currentChatSelection: {
    user: {} as ChatUser,
    chatID: null
  }
}

const chatsSlice = createSlice({
  name: 'chats',
  initialState: chatsInitialState,
  reducers: {
    ...chatsActions,
    reset: (state: ChatsState) => (chatsInitialState),
  },
});

export const {
  updateHistory,
  updateCurrentChatSelection,
  clearCurrentChatSelection
} = chatsSlice.actions;

export default chatsSlice.reducer as Reducer<typeof chatsInitialState>;
