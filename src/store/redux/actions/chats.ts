import { PayloadAction } from '@reduxjs/toolkit';
import { ChatUser, UserChatDocument } from '../../../utils/types';
import { User } from 'firebase/auth';
import { chatsInitialState } from '../reducer/chats';
import { isEmpty } from 'lodash';

export type ChatSelection = {
  user: ChatUser;
  chatID: string | null;
};

export type ChatsState = {
  history: UserChatDocument[];
  currentChatSelection: ChatSelection;
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
    let newChatId: string | null = null;

    if (!isEmpty(data.selectedUser)) {
      newChatId = data.currentUser.uid > data.selectedUser.uid!
        ? data.currentUser.uid + data.selectedUser.uid
        : data.selectedUser.uid + data.currentUser.uid
    }
    state.currentChatSelection = {
      user: data.selectedUser,
      chatID: newChatId
    }
  },
  clearCurrentChatSelection: (state: ChatsState) => chatsInitialState
};

export default chatsActions;
