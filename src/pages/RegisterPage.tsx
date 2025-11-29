import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { getEmailError, getPasswordError } from '../utils/validation';
import { FormField } from '../components/FormField';
import { SubmitButton } from '../components/SubmitButton';
import { LinkButton } from '../components/LinkButton';

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, error, loading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    const success = await registerUser(data.email, data.password, data.name);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="flex-center">
      <div className="card register-page">
        <h1>Rejestracja</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register-form"
          aria-label="Zarejestruj nowe konto"
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
            autoComplete="new-password"
            register={register}
            validation={{
              required: 'Hasło jest wymagane',
              validate: (value) => getPasswordError(value) || undefined,
            }}
            error={errors.password}
          />
          <FormField
            id="name"
            label="Imię i nazwisko"
            type="text"
            placeholder="Imię i nazwisko"
            autoComplete="name"
            register={register}
            validation={{
              required: 'Imię i nazwisko jest wymagane',
            }}
            error={errors.name}
          />
          <SubmitButton isLoading={loading} variant="secondary">
            Zarejestruj się
          </SubmitButton>
          {error && (
            <div className="error-text" role="alert" aria-live="polite">
              {error}
            </div>
          )}
          <div className="form-footer">
            <LinkButton to="/login" variant="primary" buttonStyle="ghost">
              Powrót do logowania
            </LinkButton>
          </div>
        </form>
      </div>
    </div>
  );
};
