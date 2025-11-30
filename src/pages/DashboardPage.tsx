import { useNavigate } from 'react-router-dom';
import { useUserAndAccount } from '../hooks/useAccount';
import { currencyFormatter } from '../utils/heleprs';
import { LinkButton } from '../components/LinkButton';
import { Button } from '../components/Button';
import { useEffect } from 'react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    balance,
    transactions,
    logout,
    loading: userAndAccountLoading,
    error,
  } = useUserAndAccount();
  const isLoading = userAndAccountLoading;

  useEffect(() => {
    if (!userAndAccountLoading && (!user || transactions === undefined)) {
      navigate('/login', { replace: true });
    }
  }, [userAndAccountLoading, user, balance, transactions, navigate]);

  if (error) return <div>Error: {error}</div>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const formattedBalance = currencyFormatter(balance);

  return (
    <div className="container">
      <header className="dashboard-header">
        <h1>Mini Bank</h1>
        <div className="user-info">
          <span className="user-name">Witaj, {user?.name}</span>
          {user?.role === 'admin' && (
            <LinkButton to="/admin" variant="primary" buttonStyle="outline" tabIndex={0}>
              Panel administratora
            </LinkButton>
          )}
          <Button
            onClick={handleLogout}
            type="button"
            variant="danger"
            buttonStyle="outline"
            aria-label="Wyloguj się z konta"
          >
            Wyloguj się
          </Button>
        </div>
      </header>

      <main aria-label="Przegląd konta">
        <section className="card balance-card">
          <h2>Dostępne środki</h2>
          <div
            data-testid="balance-amount"
            className={`balance-amount ${isLoading ? '' : balance > 0 ? 'amount-incoming' : 'amount-outgoing'}`}
            role="status"
            aria-live="polite"
          >
            {isLoading ? 'Ładowanie...' : `${formattedBalance}`}
          </div>
        </section>

        <section className="actions-section">
          <LinkButton
            to="/add-money"
            variant="secondary"
            buttonStyle="filled"
            aria-label="Doładuj konto"
          >
            Doładuj konto ⬇
          </LinkButton>
          <LinkButton
            to="/send-money"
            variant="primary"
            buttonStyle="filled"
            aria-label="Wykonaj przelew"
          >
            Wykonaj przelew ⬆
          </LinkButton>
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
              {transactions.map((t) => (
                <div
                  key={t.id}
                  className="transaction-item"
                  role="listitem"
                  aria-label={`Transakcja ${t.type === 'incoming' ? 'przychodząca' : 'wychodząca'}: ${t.title}, ${currencyFormatter(t.amount, true)}, ${t.date}`}
                >
                  <div className="transaction-details">
                    <div className="transaction-recipient">{t.recipient}</div>
                    {t.title && <div className="transaction-title">{t.title}</div>}
                    <time className="transaction-date" dateTime={t.date}>
                      {t.date}
                    </time>
                  </div>
                  <div className={t.amount > 0 ? 'amount-incoming' : 'amount-outgoing'}>
                    {currencyFormatter(t.amount, true)}
                  </div>
                </div>
              ))}
              {transactions.length === 0 && <div className="empty-state">Brak transakcji</div>}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
