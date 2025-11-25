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
        <h1>Access Denied</h1>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          You don't have permission to access this page.
        </p>
        <p style={{ marginBottom: '30px' }}>This page is restricted to administrators only.</p>
        <button onClick={handleGoBack} aria-label="Return to your dashboard">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};
