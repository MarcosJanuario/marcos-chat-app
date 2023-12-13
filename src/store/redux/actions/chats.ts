import { PayloadAction } from '@reduxjs/toolkit';
import { ChatUser, UserChatDocument } from '../../../utils/types';
import { User } from 'firebase/auth';
import { chatsInitialState } from '../reducer/chats';

export type ChatsState = {
  history: UserChatDocument[];
  currentChatSelection: {
    user: ChatUser;
    chatID: string | null;
  }
};

export type UpdateCurrentChatSelectionAction = {
  currentUser: User,
  selectedUser: ChatUser
}

const chatsActions = {
  updateHistory: (state: ChatsState, action: PayloadAction<UserChatDocument[]>): void => {
    state.history = action.payload;
  },
  updateCurrentChatSelection: (state: ChatsState, action: PayloadAction<UpdateCurrentChatSelectionAction>): void => {
    const data = action.payload;
    const newChatId = data.currentUser.uid > data.selectedUser.uid!
      ? data.currentUser.uid + data.selectedUser.uid
      : data.selectedUser.uid + data.currentUser.uid;
    state.currentChatSelection = {
      user: data.selectedUser,
      chatID: newChatId
    }
  },
  clearCurrentChatSelection: (state: ChatsState) => chatsInitialState
};

export default chatsActions;