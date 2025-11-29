import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAddMoney, useSendMoney, useAccount } from '../hooks/useAccount';
import { getRecipientError, getTitleError, getAmountError } from '../utils/validation';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';
import { LinkButton } from '../components/LinkButton';

interface TransactionFormData {
  recipient: string;
  title: string;
  amount: string;
}

export const TransactionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { account, loading: accountLoading, error: accountError } = useAccount();
  const { addMoney, error: addMoneyError, loading: addMoneyLoading } = useAddMoney();
  const { sendMoney, error: sendMoneyError, loading: sendMoneyLoading } = useSendMoney();

  const isAddMode = location.pathname === '/add-money';

  const error = accountError || (isAddMode ? addMoneyError : sendMoneyError);
  const isLoading = accountLoading;
  const isProcessing = isAddMode ? addMoneyLoading : sendMoneyLoading;

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
      if (isAddMode) {
        await addMoney({
          accountId: account.id,
          title: data.title,
          amount: Number(data.amount),
        });
      } else {
        await sendMoney({
          accountId: account.id,
          recipient: data.recipient,
          title: data.title,
          amount: Number(data.amount),
        });
      }
      navigate('/dashboard');
    } catch {
      // Error is handled by the hooks
    }
  };

  return (
    <div className="container">
      <h2>{isAddMode ? 'Doładuj konto' : 'Wykonaj przelew'}</h2>

      {isLoading ? (
        <p>Trwa ładowanie...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit, (errors) =>
            console.error('Form validation failed:', errors),
          )}
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
          <SubmitButton
            isLoading={isProcessing}
            loadingText={isAddMode ? undefined : 'Trwa długie procesowanie operacji...'}
            variant={isAddMode ? 'secondary' : 'primary'}
            buttonStyle={isAddMode ? 'filled' : 'outline'}
          >
            {isAddMode ? 'Doładuj' : 'Wyślij przelew'}
          </SubmitButton>
          <LinkButton to="/dashboard" variant="neutral" buttonStyle="outline">
            Anuluj
          </LinkButton>
        </form>
      )}
    </div>
  );
};
