import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTransaction, useAccount } from '../hooks/useAccount';
import { getRecipientError, getTitleError, getAmountError } from '../utils/validation';

export const TransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAccount();
  const { transaction, error, loading } = useTransaction();

  const isAddMode = location.pathname === '/add-money';
  const isTransferMode = location.pathname === '/send-money';

  const [recipient, setRecipient] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const [recipientError, setRecipientError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [amountError, setAmountError] = useState<string | null>(null);

  const handleRecipientBlur = () => {
    setRecipientError(getRecipientError(recipient));
  };

  const handleTitleBlur = () => {
    setTitleError(getTitleError(title));
  };

  const handleAmountBlur = () => {
    setAmountError(getAmountError(amount));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!account) return;

    // Validate before submitting
    const recipientErr = isAddMode ? null : getRecipientError(recipient);
    const titleErr = getTitleError(title);
    const amountErr = getAmountError(amount);

    if (!isAddMode) setRecipientError(recipientErr);
    setTitleError(titleErr);
    setAmountError(amountErr);

    if (recipientErr || titleErr || amountErr) {
      return;
    }

    try {
      await transaction({
        accountId: account.id,
        recipient: isAddMode ? 'myself' : recipient,
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
              onChange={(e) => {
                setRecipient(e.target.value);
                if (recipientError) setRecipientError(null);
              }}
              onBlur={handleRecipientBlur}
              autoComplete="off"
              aria-invalid={!!recipientError}
              aria-describedby={recipientError ? 'recipient-error' : undefined}
              required
            />
            {recipientError && (
              <div id="recipient-error" className="error-text" role="alert">
                {recipientError}
              </div>
            )}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError(null);
            }}
            onBlur={handleTitleBlur}
            autoComplete="off"
            aria-invalid={!!titleError}
            aria-describedby={titleError ? 'title-error' : undefined}
            required
          />
          {titleError && (
            <div id="title-error" className="error-text" role="alert">
              {titleError}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (amountError) setAmountError(null);
            }}
            onBlur={handleAmountBlur}
            min="0.01"
            step="0.01"
            inputMode="decimal"
            autoComplete="transaction-amount"
            aria-invalid={!!amountError}
            aria-describedby={amountError ? 'amount-error' : undefined}
            required
          />
          {amountError && (
            <div id="amount-error" className="error-text" role="alert">
              {amountError}
            </div>
          )}
        </div>

        {error && (
          <div className="error-text" role="alert" aria-live="polite">
            {error}
          </div>
        )}
        <button type="submit" disabled={loading}>
          {isAddMode ? 'Add Money' : 'Send Transfer'}
        </button>
        <button type="button" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
      </form>
    </div>
  );
};
