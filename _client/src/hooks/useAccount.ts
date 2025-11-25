import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useUser } from './useUser';
import type { Account, TransactionInput } from '../types';

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
      if (err instanceof Error) {
        setError(err.message);
      }
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

export const useTransaction = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transaction = async ({ recipient, amount, title, accountId, type }: TransactionInput) => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        return;
      }
      await apiClient.post(`/api/transaction/${accountId}`, {
        recipient,
        amount,
        title,
        accountId,
        type,
      });
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

  return { transaction, loading, error };
};
