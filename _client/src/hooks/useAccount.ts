import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { extractErrorMessage } from '../utils/apiErrorHandler';
import { useUser } from './useUser';
import type { Account, TransactionInput } from '../types';

export const useAccount = () => {
  const { user } = useUser();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    if (!user) {
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get<Account>(`/api/account/${user.id}`);
      setAccount(response.data);
    } catch (err: unknown) {
      setError(extractErrorMessage(err, `Failed to fetch account of user ${user.id}`));
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { account, loading, error, refetch };
};

export const useTransfer = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transfer = async ({ recipient, amount, title, accountId, type }: TransactionInput) => {
    setLoading(true);
    setError(null);
    try {
      if (!user) {
        return;
      }
      await apiClient.post(`/api/transfer/${accountId}`, {
        recipient,
        amount,
        title,
        accountId,
        type,
      });
      return true;
    } catch (err: unknown) {
      setError(extractErrorMessage(err, 'Transfer failed'));
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { transfer, loading, error };
};
