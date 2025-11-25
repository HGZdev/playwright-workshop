import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TransferPage.css';

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
      await axios.post('/api/transfer', {
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
    <div className="container transfer-container">
      <div className="card transfer-card">
        <h1>Make Transfer</h1>
        <form onSubmit={handleTransfer} className="transfer-form">
          <div className="form-group">
            <label>Recipient Name</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          {error && <div className="error-text">{error}</div>}

          <div className="button-group">
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
