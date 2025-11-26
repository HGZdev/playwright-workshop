import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { getEmailError, getPasswordError } from '../utils/validation';
import { FormField } from '../components/FormField';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);

    if (success) {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="flex-center">
      <div className="card login-page">
        <h1>Mini Bank</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
          aria-label="Login to your account"
        >
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            register={register}
            validation={{
              required: 'Email is required',
              validate: (value) => getEmailError(value) || undefined,
            }}
            error={errors.email}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            register={register}
            validation={{
              required: 'Password is required',
              validate: (value) => getPasswordError(value) || undefined,
            }}
            error={errors.password}
          />
          <button type="submit">Login</button>
          {error && (
            <div className="error-text" role="alert" aria-live="polite">
              {error}
            </div>
          )}
          <div className="form-footer">
            <a
              href="/register"
              onClick={(e) => {
                e.preventDefault();
                navigate('/register');
              }}
            >
              Register new account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};
