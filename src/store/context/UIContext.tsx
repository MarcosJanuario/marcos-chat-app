import React, { createContext, FC, useContext, useReducer } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

export type UIContextType = {
  modal: {
    headerText: string;
    content: JSX.Element | null;
    visibility: boolean;
  }
}

export type UIDispatchAction = {
  type: string;
  payload?: UIContextType;
}

export type UIReducer = {
  data: UIContextType,
  dispatchUI: (data: UIDispatchAction) => void;
}

const INITIAL_UI_CONTEXT = {
  modal: {
    headerText: '',
    content: null,
    visibility: false
  }
}

export const UIContext = createContext<any>(INITIAL_UI_CONTEXT);

type UIContextProviderProps = {
  children: JSX.Element;
}

export const UIContextProvider: FC<UIContextProviderProps> = ({ children }) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const uiReducer = (state: UIContextType, action?: UIDispatchAction): UIContextType => {
    switch (action?.type) {
      case 'HANDLE_MODAL':
        if (!action?.payload) {
          return state;
        }
        return {
          modal: {
            headerText: action.payload.modal.headerText,
            content: action.payload.modal.content,
            visibility: action.payload.modal.visibility
          }
        }
      case 'RESET_MODAL':
        return INITIAL_UI_CONTEXT
      default:
        return state;
    }
  }

  const [ state, dispatchUI ] = useReducer<any>(uiReducer, INITIAL_UI_CONTEXT);

  return (
    <UIContext.Provider value={{ data:state, dispatchUI}}>
      { children }
    </UIContext.Provider>
  )
}
