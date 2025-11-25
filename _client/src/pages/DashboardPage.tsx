import { useNavigate } from 'react-router-dom';
import { useGetBalance, useGetTransactions } from '../hooks/useAccount';
import { useUser } from '../hooks/useUser';

export const DashboardPage: React.FC = () => {
  const { balance } = useGetBalance();
  const { transactions } = useGetTransactions();
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
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
