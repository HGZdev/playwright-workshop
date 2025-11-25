import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DashboardPage.css';

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
        const balanceRes = await axios.get('/api/balance');
        setBalance(balanceRes.data.balance);

        const transactionsRes = await axios.get('/api/transactions');
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
      <header className="dashboard-header">
        <h1>Mini Bank</h1>
        <div className="user-info">
          <span className="user-name">Welcome, {user.name}</span>
          <button onClick={handleLogout} type="button">
            Logout
          </button>
        </div>
      </header>

      <div className="card balance-card">
        <h2>Available Balance</h2>
        <div className="balance-amount">{balance !== null ? `${balance} PLN` : 'Loading...'}</div>
      </div>

      <div className="actions-section">
        <button onClick={() => navigate('/transfer')}>Make Transfer</button>
      </div>

      <div className="card transactions-card">
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {transactions.map((t) => (
            <div key={t.id} className="transaction-item">
              <div className="transaction-details">
                <div className="transaction-title">{t.title}</div>
                <div className="transaction-date">{t.date}</div>
              </div>
              <div className={t.type === 'incoming' ? 'amount-incoming' : 'amount-outgoing'}>
                {t.amount > 0 ? '+' : ''}
                {t.amount} PLN
              </div>
            </div>
          ))}
          {transactions.length === 0 && <div className="empty-state">No transactions yet</div>}
        </div>
      </div>
    </div>
  );
};
