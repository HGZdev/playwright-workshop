import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransfer } from '../hooks/useAccount';

export const TransferPage: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const { transfer, error } = useTransfer();

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await transfer(recipient, Number(amount), title);
    if (success) {
      navigate('/dashboard');
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
