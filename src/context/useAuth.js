import { useContext } from 'react';
import { AuthContext } from './userAuth'; 

export const useAuth = () => {
  return useContext(AuthContext); 
};
