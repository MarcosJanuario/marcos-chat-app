import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';
import { ChatUser } from '../../utils/types';

export type ChatContextType = {
  user: ChatUser,
  chatID: string;
}

export type ChatDispatchAction = {
  type: string;
  payload: ChatUser
}

export type ChatReducer = {
  data: ChatContextType,
  dispatch: (data: ChatDispatchAction) => void;
}

const INITIAL_CHAT_CONTEXT = {
  chatID: 'null',
  user: {}
}

export const ChatContext = createContext<any>('');

type ChatContextProviderProps = {
  children: JSX.Element;
}

export const ChatContextProvider = ({ children }: ChatContextProviderProps) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const chatReducer = (state: ChatContextType, action: ChatDispatchAction): ChatContextType => {
    console.log('[REDUCER] state: ', state);
    console.log('[REDUCER] action: ', action);
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatID: currentUser.uid > action.payload.uid
            ? currentUser.uid + action.payload.uid
            : action.payload.uid + currentUser.uid
        }
      default:
        return state;
    }
  }

  const [ state, dispatch ] = useReducer<any>(chatReducer, INITIAL_CHAT_CONTEXT);

  return (
    <ChatContext.Provider value={{ data:state, dispatch}}>
      { children }
    </ChatContext.Provider>
  )
}
