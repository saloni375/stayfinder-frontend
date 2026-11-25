import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

// A JWT has 3 parts: header.payload.signature
// The payload is readable (Base64) and contains "exp": the expiry time in seconds
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // if we can't read it, treat it as expired
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // If there's no valid token, the user is not really logged in
    if (!saved || !token || isTokenExpired(token)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return null;
    }
    return JSON.parse(saved);
  });

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    if (token) {
      localStorage.setItem('token', token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);