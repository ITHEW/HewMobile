// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('@token');
      if (stored) setToken(stored);
      setLoading(false);
    })();
  }, []);

  const login = async (newToken, userData) => {
    await AsyncStorage.setItem('@token', newToken);
    await AsyncStorage.setItem('@user', JSON.stringify(userData));
    setToken(newToken); 
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
