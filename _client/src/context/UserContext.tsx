import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import apiClient from '../api/apiClient';
import { extractErrorMessage } from '../utils/apiErrorHandler';

interface AuthResponse {
  token: string;
  user: User;
}

export interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

// eslint-disable-next-line
export const UserContext = createContext<UserContextType | null>(null);

export interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Use lazy initialization to load user from localStorage
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser;
      } catch {
        // If parsing fails, clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post<AuthResponse>('/api/login', {
        username,
        password,
      });

      const { user: userData, token } = response.data;

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      setUser(userData);

      return true;
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Login failed');
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post<AuthResponse>('/api/register', {
        username,
        password,
        name,
      });
      return true;
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Registration failed');
      setError(errorMessage);
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  return (
    <UserContext.Provider
      value={{ user, login, register, logout, isAuthenticated, isAdmin, loading, error }}
    >
      {children}
    </UserContext.Provider>
  );
};
