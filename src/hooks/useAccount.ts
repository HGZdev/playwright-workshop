import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useUser } from './useUser';
import { extractErrorMessage } from '../utils/apiErrorHandler';
import type { Account } from '../types';

export const useAccount = () => {
  const { user, loading: userLoading } = useUser();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoading = userLoading || loading;

  const refetch = useCallback(async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Account>(`/api/account/${user.accountId}`);
      setAccount(response.data);
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Failed to load account details');
      setError(errorMessage);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { account, loading: isLoading, error, refetch };
};

export const useAddMoney = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMoney = async ({
    amount,
    title,
    accountId,
  }: {
    amount: number;
    title: string;
    accountId: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        return;
      }
      await apiClient.post(`/api/add-money/${accountId}`, {
        amount,
        title,
        accountId,
      });
      return true;
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Dodawanie środków nie powiodło się');
      setError(errorMessage);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addMoney, loading, error };
};

export const useSendMoney = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMoney = async ({
    recipient,
    amount,
    title,
    accountId,
  }: {
    recipient: string;
    amount: number;
    title: string;
    accountId: number;
  }) => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        return;
      }
      await apiClient.post(`/api/send-money/${accountId}`, {
        recipient,
        amount,
        title,
        accountId,
      });
      return true;
    } catch (err) {
      const errorMessage = extractErrorMessage(err, 'Przelew nie powiódł się');
      setError(errorMessage);
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendMoney, loading, error };
};
