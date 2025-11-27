import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { getEmailError, getPasswordError } from '../utils/validation';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, user, loading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  if (user) navigate('/dashboard');

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);

    if (success) navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Mini Bank</h1>
      <div className="card login-page">
        <h2>Zaloguj się</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
          aria-label="Zaloguj się do swojego konta"
        >
          <FormField
            id="email"
            label="E-mail"
            type="email"
            placeholder="E-mail"
            autoComplete="email"
            register={register}
            validation={{
              required: 'E-mail jest wymagany',
              validate: (value) => getEmailError(value) || undefined,
            }}
            error={errors.email}
          />
          <FormField
            id="password"
            label="Hasło"
            type="password"
            placeholder="Hasło"
            autoComplete="current-password"
            register={register}
            validation={{
              required: 'Hasło jest wymagane',
              validate: (value) => getPasswordError(value) || undefined,
            }}
            error={errors.password}
          />
          <SubmitButton isLoading={loading}>Zaloguj się</SubmitButton>
          {error && (
            <div className="error-text" role="alert" aria-live="polite">
              {error}
            </div>
          )}
          <div className="form-footer">
            <Link to="/register">Zarejestruj nowe konto</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
