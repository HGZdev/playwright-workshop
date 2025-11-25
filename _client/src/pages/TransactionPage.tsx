import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransaction, useAccount } from '../hooks/useAccount';

export const TransactionPage: React.FC<{ mode?: 'transfer' | 'add' }> = ({ mode = 'transfer' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAccount();
  const { transaction, error } = useTransaction();

  const isAddMode = location.pathname === '/add-money';
  const isTransferMode = location.pathname === '/send-money';

  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

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
      setFormError('Operation failed');
    }
  };

  return (
    <div className="container">
      <h2>{isAddMode ? 'Add Money' : 'Make Transfer'}</h2>
      <form onSubmit={handleSubmit} className="transfer-form">
        {!isAddMode && (
          <div className="form-group">
            <label>Recipient</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              required
            />
          </div>
        )}
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
        {formError && <div className="error-text">{formError}</div>}
        {error && <div className="error-text">{error}</div>}
        <button type="submit">{isAddMode ? 'Add Money' : 'Send Transfer'}</button>
        <button type="button" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
      </form>
    </div>
  );
};
