import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransaction, useAccount } from '../hooks/useAccount';

export const TransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAccount();
  const { transaction, error } = useTransaction();

  const isAddMode = location.pathname === '/add-money';
  const isTransferMode = location.pathname === '/send-money';

  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;
    try {
      await transaction({
        accountId: account.id,
        recipient: isTransferMode ? 'myself' : recipient,
        title,
        amount: Number(amount),
        type: isTransferMode ? 'outgoing' : 'incoming',
      });
      navigate('/dashboard');
    } catch {
      // Error is handled by useTransaction hook
    }
  };

  return (
    <div className="container">
      <h2>{isAddMode ? 'Add Money' : 'Make Transfer'}</h2>
      <form
        onSubmit={handleSubmit}
        className="transfer-form"
        aria-label={isAddMode ? 'Add money to your account' : 'Transfer money to another account'}
      >
        {!isAddMode && (
          <div className="form-group">
            <label htmlFor="recipient">Recipient</label>
            <input
              id="recipient"
              name="recipient"
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0.01"
            step="0.01"
            inputMode="decimal"
            autoComplete="transaction-amount"
            required
          />
        </div>

        {error && (
          <div className="error-text" role="alert" aria-live="polite">
            {error}
          </div>
        )}
        <button type="submit">{isAddMode ? 'Add Money' : 'Send Transfer'}</button>
        <button type="button" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
      </form>
    </div>
  );
};
