import { useState } from 'react';
import apiClient from '../api/apiClient';
import { extractErrorMessage } from '../utils/apiErrorHandler';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    role: 'admin' | 'client';
  };
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/login', {
        username,
        password,
      });
      return response.data;
    } catch (err: unknown) {
      setError(extractErrorMessage(err, 'Login failed'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    username: string,
    password: string,
    name: string,
  ): Promise<AuthResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/register', {
        username,
        password,
        name,
      });
      return response.data;
    } catch (err: unknown) {
      setError(extractErrorMessage(err, 'Registration failed'));
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};
