import { createContext, FC, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export type AuthContextType = {
  user: User,
  clearUser: () => void
}

const initialAuthContext = {
  user: {} as User, clearUser: () => {}
}

export const AuthContext = createContext<AuthContextType>(initialAuthContext);

type AuthContextProviderProps = {
  children: JSX.Element;
}
export const AuthContextProvider: FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user): void => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe()
  }, []);

  const clearUser = () => {
    setCurrentUser({} as User);
  }

  const authContextValue = {
    user: currentUser,
    clearUser
  }


  return (
    <AuthContext.Provider value={authContextValue}>
      { children }
    </AuthContext.Provider>
  );
}
