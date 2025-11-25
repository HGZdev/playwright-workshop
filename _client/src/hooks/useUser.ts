import { useContext } from 'react';
import type { UserContextType } from '../context/UserContext';
import { UserContext } from '../context/UserContext';

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
