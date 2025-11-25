import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { extractErrorMessage } from '../utils/apiErrorHandler';
import type { User } from '../types';

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
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
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

  const updateUser = async (id: User['id'], data: Partial<User>) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.put(`/api/admin/users/${id}`, data);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error };
};

export const useDeleteUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (id: User['id']) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/api/admin/users/${id}`);
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUser, loading, error };
};
