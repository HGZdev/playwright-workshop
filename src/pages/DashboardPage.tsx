import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useAccount } from '../hooks/useAccount';
import { currencyFormatter } from '../utils/heleprs';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, loading: userLoading } = useUser();
  const { account, loading: accountLoading, error } = useAccount();

  const isLoading = userLoading || accountLoading;

  if (error) return <div>Error: {error}</div>;

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
          <span className="user-name">Witaj, {user?.name}</span>
          {user?.role === 'admin' && (
            <Link to="/admin" role="button" tabIndex={0}>
              Panel administratora
            </Link>
          )}
          <button onClick={handleLogout} type="button" aria-label="Wyloguj się z konta">
            Wyloguj się
          </button>
        </div>
      </header>

      <main aria-label="Przegląd konta">
        <section className="card balance-card">
          <h2>Dostępne saldo</h2>
          <div
            data-testid="balance-amount"
            className="balance-amount"
            role="status"
            aria-live="polite"
          >
            {isLoading ? 'Ładowanie...' : `${currencyFormatter(balance)}`}
          </div>
        </section>

        <section className="actions-section">
          <Link to="/add-money" aria-label="Doładuj konto">
            Doładuj konto ⬇
          </Link>
          <Link to="/send-money" aria-label="Wykonaj przelew">
            Wykonaj przelew ⬆
          </Link>
        </section>

        <section className="card transactions-card">
          <h2>Ostatnie transakcje</h2>
          {isLoading ? (
            <div className="transactions-list">
              <div className="loading-state" role="status" aria-live="polite">
                Ładowanie...
              </div>
            </div>
          ) : (
            <div className="transactions-list" role="list">
              {account?.transactions.map((t) => (
                <div
                  key={t.id}
                  className="transaction-item"
                  role="listitem"
                  aria-label={`Transakcja ${t.type === 'incoming' ? 'przychodząca' : 'wychodząca'}: ${t.title}, ${currencyFormatter(t.amount, true)}, ${t.date}`}
                >
                  <div className="transaction-details">
                    <div className="transaction-title">{t.title}</div>
                    <time className="transaction-date" dateTime={t.date}>
                      {t.date}
                    </time>
                  </div>
                  <div className={t.type === 'incoming' ? 'amount-incoming' : 'amount-outgoing'}>
                    {currencyFormatter(t.amount, true)}
                  </div>
                </div>
              ))}
              {account?.transactions.length === 0 && (
                <div className="empty-state">Brak transakcji</div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
