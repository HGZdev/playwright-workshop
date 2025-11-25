import { useState, useCallback, useEffect } from 'react';
import apiClient from '../api/apiClient';
import { extractErrorMessage } from '../utils/apiErrorHandler';

interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: 'incoming' | 'outgoing';
}

export const useGetBalance = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/api/account/balance');
      setBalance(response.data.balance);
    } catch (err: unknown) {
      setError(extractErrorMessage(err, 'Failed to fetch balance'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { balance, loading, error, refetch };
};

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/api/account/transactions');
      setTransactions(response.data);
    } catch (err: unknown) {
      setError(extractErrorMessage(err, 'Failed to fetch transactions'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { transactions, loading, error, refetch };
};

export const useTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transfer = async (recipient: string, amount: number, title: string) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.post('/api/account/transfer', {
        recipient,
        amount,
        title,
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
