import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setAdmin({ isLoggedIn: true });
    } else {
      localStorage.removeItem('token');
      setAdmin(null);
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};