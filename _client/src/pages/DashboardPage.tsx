import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useAccount } from '../hooks/useAccount';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, loading: userLoading } = useUser();
  const { account, loading: accountLoading, error } = useAccount();

  const isLoading = userLoading || accountLoading;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) navigate('/login');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const balance = account?.transactions.reduce((acc, t) => acc + t.amount, 0) || 0;

  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Mini Bank</h1>
        <div className="user-info">
          <span className="user-name">Welcome, {user?.name}</span>
          <button onClick={handleLogout} type="button">
            Logout
          </button>
        </div>
      </header>

      <div className="card balance-card">
        <h2>Available Balance</h2>
        <div className="balance-amount">{isLoading ? 'Loading...' : `${balance} PLN`}</div>
      </div>

      <div className="actions-section">
        <button onClick={() => navigate('/transfer')}>Make Transfer</button>
      </div>

      <div className="card transactions-card">
        <h2>Recent Transactions</h2>
        {isLoading ? (
          <div className="transactions-list">
            <div className="loading-state">Loading...</div>
          </div>
        ) : (
          <div className="transactions-list">
            {account?.transactions.map((t) => (
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
            {account?.transactions.length === 0 && (
              <div className="empty-state">No transactions yet</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
