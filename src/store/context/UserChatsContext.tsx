import React, { createContext, useContext, useReducer } from 'react';
import { AuthContextType } from './AuthContext';
import { UserChatDocument } from '../../utils/types';

export type UserChatsContextType = {
  userChats: UserChatDocument[],
}

export type UserChatsDispatchAction = {
  type: string;
  payload?: UserChatDocument[]
}

export type UserChatsReducer = {
  data: UserChatsContextType,
  dispatch: (data: UserChatsDispatchAction) => void;
}

const INITIAL_USER_CHATS_CONTEXT = {
  userChats: [],
}

export const UserChatsContext = createContext<any>([]);

type ChatContextProviderProps = {
  children: JSX.Element;
}

export const UserChatsContextProvider = ({ children }: ChatContextProviderProps) => {
  const { user : currentUser } = useContext<AuthContextType>(UserChatsContext);

  const chatReducer = (state: UserChatsContextType, action?: UserChatsDispatchAction): UserChatsContextType => {
    switch (action?.type) {
      case 'UPDATE_USER_CHATS':
        if (!action?.payload) {
          return state;
        }
        return {
          userChats: action.payload
        }
      case 'CLEAR':
        return INITIAL_USER_CHATS_CONTEXT
      default:
        return state;
    }
  }

  const [ state, dispatch ] = useReducer<any>(chatReducer, INITIAL_USER_CHATS_CONTEXT);

  return (
    <UserChatsContext.Provider value={{ data:state, dispatch}}>
      { children }
    </UserChatsContext.Provider>
  )
}
