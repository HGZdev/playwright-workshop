import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const TransferPage: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:3001/api/transfer', {
        recipient,
        title,
        amount: Number(amount),
      });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Transfer failed');
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginTop: 0 }}>Make Transfer</h1>
        <form
          onSubmit={handleTransfer}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div>
            <label
              style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}
            >
              Recipient Name
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
              required
            />
          </div>
          <div>
            <label
              style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}
            >
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
              required
            />
          </div>
          <div>
            <label
              style={{ display: 'block', marginBottom: '5px', color: 'var(--text-secondary)' }}
            >
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: '100%', boxSizing: 'border-box' }}
              required
            />
          </div>

          {error && <div className="error-text">{error}</div>}

          <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <button type="submit">Send Transfer</button>
            <button type="button" onClick={() => navigate('/dashboard')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
