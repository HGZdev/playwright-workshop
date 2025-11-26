import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTransaction, useAccount } from '../hooks/useAccount';
import { getRecipientError, getTitleError, getAmountError } from '../utils/validation';
import { FormField } from '../components/FormField';

interface TransactionFormData {
  recipient: string;
  title: string;
  amount: string;
}

export const TransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account } = useAccount();
  const { transaction, error, loading } = useTransaction();

  const isAddMode = location.pathname === '/add-money';
  const isTransferMode = location.pathname === '/send-money';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: TransactionFormData) => {
    if (!account) return;

    try {
      await transaction({
        accountId: account.id,
        recipient: isAddMode ? 'myself' : data.recipient,
        title: data.title,
        amount: Number(data.amount),
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
        onSubmit={handleSubmit(onSubmit)}
        className="transfer-form"
        aria-label={isAddMode ? 'Add money to your account' : 'Transfer money to another account'}
      >
        {!isAddMode && (
          <FormField
            id="recipient"
            label="Recipient"
            type="text"
            autoComplete="off"
            register={register}
            validation={{
              required: 'Recipient is required',
              validate: (value) => getRecipientError(value) || undefined,
            }}
            error={errors.recipient}
          />
        )}
        <FormField
          id="title"
          label="Title"
          type="text"
          autoComplete="off"
          register={register}
          validation={{
            required: 'Title is required',
            validate: (value) => getTitleError(value) || undefined,
          }}
          error={errors.title}
        />
        <FormField
          id="amount"
          label="Amount"
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          autoComplete="transaction-amount"
          register={register}
          validation={{
            required: 'Amount is required',
            validate: (value) => getAmountError(value) || undefined,
          }}
          error={errors.amount}
        />

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
