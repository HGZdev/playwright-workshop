import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage: React.FC = () => {
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
        <Link to="/">Powrót do strony głównej</Link>
      </div>
    </div>
  );
};
