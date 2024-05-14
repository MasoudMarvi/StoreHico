import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { USER } from '../utility/Constants';

export const LoginContext = createContext();
export const LoginContextSet = createContext();

function LoginProvider({ children }) {
  const [user, setUSer] = useState(null);

  const getUserFromStorage = async () => {
    const user = await AsyncStorage.getItem(USER);
    if (user) {
      setUSer(JSON.parse(user));
    } else {
      setUSer({ token: '' });
    }
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem(USER, JSON.stringify(user));
    }
  }, [user]);

  return (
    <LoginContext.Provider value={user}>
      <LoginContextSet.Provider value={setUSer}>
        {children}
      </LoginContextSet.Provider>
    </LoginContext.Provider>
  );
}

export default LoginProvider;
