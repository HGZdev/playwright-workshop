import { useState, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { useContextUser } from './useUser';
import { extractErrorMessage } from '../utils/apiErrorHandler';
import type { Account } from '../types';

export const useUserAndAccount = () => {
  const { user, login, logout, loading: userLoading } = useContextUser();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isLoading = userLoading || loading;

  useEffect(() => {
    if (!user) {
      setAccount(null);
      setError(null);
      return;
    }

    let cancelled = false;

    const fetchAccount = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await apiClient.get<Account>(`/api/account/${user.accountId}`);
        if (!cancelled) {
          setAccount(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage = extractErrorMessage(err, 'Failed to load account details');
          setError(errorMessage);
          console.error(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAccount();

    return () => {
      cancelled = true;
    };
  }, [user?.accountId]);

  const balance = account?.transactions.reduce((acc, t) => acc + t.amount, 0) || 0;
  const transactions = account?.transactions || [];

  return { user, balance, transactions, login, logout, loading: isLoading, error };
};

export const useAddMoney = () => {
  const { user } = useContextUser();
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
  const { user } = useContextUser();
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
