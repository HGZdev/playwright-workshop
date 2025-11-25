import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'client';
}

export const useGetUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/api/admin/users');
      setUsers(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      setError(errorMessage || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { users, loading, error, refetch };
};

export const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (id: string, data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.put(`/api/admin/users/${id}`, data);
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      setError(errorMessage || 'Failed to update user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/api/admin/users/${id}`);
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      setError(errorMessage || 'Failed to delete user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};
