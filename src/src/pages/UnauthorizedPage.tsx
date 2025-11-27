import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGoBack = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex-center">
      <div
        className="card"
        style={{ width: '100%', maxWidth: '500px', textAlign: 'center' }}
        role="alert"
      >
        <h1>Brak dostępu</h1>
        <p style={{ marginBottom: '20px', color: '#666' }}>Nie masz uprawnień do tej strony.</p>
        <p style={{ marginBottom: '30px' }}>Ta strona jest dostępna tylko dla administratorów.</p>
        <button onClick={handleGoBack} aria-label="Powrót do panelu">
          Przejdź do panelu
        </button>
      </div>
    </div>
  );
};
