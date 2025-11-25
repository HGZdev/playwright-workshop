import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Transaction {
  id: string;
  date: string;
  title: string;
  amount: number;
  type: 'incoming' | 'outgoing';
}

export const DashboardPage: React.FC = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const balanceRes = await axios.get('http://localhost:3001/api/balance');
        setBalance(balanceRes.data.balance);

        const transactionsRes = await axios.get('http://localhost:3001/api/transactions');
        setTransactions(transactionsRes.data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
        }}
      >
        <h1>Mini Bank</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout} type="button">
            Logout
          </button>
        </div>
      </header>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginTop: 0 }}>Available Balance</h2>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
          {balance !== null ? `${balance} PLN` : 'Loading...'}
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <button onClick={() => navigate('/transfer')}>Make Transfer</button>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0 }}>Recent Transactions</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {transactions.map((t) => (
            <div key={t.id} className="transaction-item">
              <div>
                <div style={{ fontWeight: 'bold' }}>{t.title}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{t.date}</div>
              </div>
              <div className={t.type === 'incoming' ? 'amount-incoming' : 'amount-outgoing'}>
                {t.amount > 0 ? '+' : ''}
                {t.amount} PLN
              </div>
            </div>
          ))}
          {transactions.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
