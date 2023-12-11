import React, { createContext, useContext, useReducer } from 'react';
import { AuthContext, AuthContextType } from './AuthContext';

export type PermissionsContextType = {
  permission: {
    persistUserEmail: boolean;
    uploadUserImages: boolean;
  }
}

export type PermissionsDispatchAction = {
  type: string;
  payload?: PermissionsContextType;
}

export type PermissionsReducer = {
  data: PermissionsContextType,
  dispatchPermissions: (data: PermissionsDispatchAction) => void;
}

const INITIAL_PERMISSIONS_CONTEXT = {
  permission: {
    persistUserEmail: false,
    uploadUserImages: false,
  }
}

export const PermissionsContext = createContext<any>(INITIAL_PERMISSIONS_CONTEXT);

type PermissionsContextProviderProps = {
  children: JSX.Element;
}

export const PermissionsContextProvider = ({ children }: PermissionsContextProviderProps) => {
  const { user : currentUser } = useContext<AuthContextType>(AuthContext);

  const uiReducer = (state: PermissionsContextType, action?: PermissionsDispatchAction): PermissionsContextType => {
    switch (action?.type) {
      case 'UPDATE_PERMISSION':
        if (!action?.payload) {
          return state;
        }
        return {
          permission: {
            persistUserEmail: action.payload.permission.persistUserEmail,
            uploadUserImages: action.payload.permission.uploadUserImages,
          }
        }
      default:
        return state;
    }
  }

  const [ state, dispatchPermissions ] = useReducer<any>(uiReducer, INITIAL_PERMISSIONS_CONTEXT);

  return (
    <PermissionsContext.Provider value={{ data:state, dispatchPermissions }}>
      { children }
    </PermissionsContext.Provider>
  )
}
