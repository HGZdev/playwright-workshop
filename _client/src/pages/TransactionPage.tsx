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
      <h2>{isAddMode ? 'Doładuj konto' : 'Wykonaj przelew'}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="transfer-form"
        aria-label={isAddMode ? 'Doładuj pieniądze na konto' : 'Przelej pieniądze na inne konto'}
      >
        {!isAddMode && (
          <FormField
            id="recipient"
            label="Odbiorca"
            type="text"
            autoComplete="off"
            register={register}
            validation={{
              required: 'Odbiorca jest wymagany',
              validate: (value) => getRecipientError(value) || undefined,
            }}
            error={errors.recipient}
          />
        )}
        <FormField
          id="title"
          label="Tytuł"
          type="text"
          autoComplete="off"
          register={register}
          validation={{
            required: 'Tytuł jest wymagany',
            validate: (value) => getTitleError(value) || undefined,
          }}
          error={errors.title}
        />
        <FormField
          id="amount"
          label="Kwota"
          type="number"
          min="0.01"
          step="0.01"
          inputMode="decimal"
          autoComplete="transaction-amount"
          register={register}
          validation={{
            required: 'Kwota jest wymagana',
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
          {isAddMode ? 'Doładuj' : 'Wyślij przelew'}
        </button>
        <button type="button" onClick={() => navigate('/dashboard')}>
          Anuluj
        </button>
      </form>
    </div>
  );
};
