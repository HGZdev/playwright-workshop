import { Navigate, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useAccount } from '../hooks/useAccount';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useUser();
  const { account, loading, error } = useAccount();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user || !account) return <Navigate to="/login" />;

  const balance = account.transactions.reduce((acc, t) => acc + t.amount, 0) || 0;

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
        <div className="balance-amount">{balance ? `${balance} PLN` : 'Loading...'}</div>
      </div>

      <div className="actions-section">
        <button onClick={() => navigate('/transfer')}>Make Transfer</button>
      </div>

      <div className="card transactions-card">
        <h2>Recent Transactions</h2>
        <div className="transactions-list">
          {account.transactions.map((t) => (
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
          {account.transactions.length === 0 && (
            <div className="empty-state">No transactions yet</div>
          )}
        </div>
      </div>
    </div>
  );
};
