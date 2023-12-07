import { createContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export const AuthContext = createContext({} as User);

type AuthContextProviderProps = {
  children: JSX.Element;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User>({} as User);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user): void => {
      if (user) {
        setCurrentUser(user);
        console.log('[USER]: ', user);
      }
    });
    return () => unsubscribe()
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>
      { children }
    </AuthContext.Provider>
  );
}
