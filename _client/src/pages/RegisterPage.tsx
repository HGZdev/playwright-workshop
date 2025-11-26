import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { getEmailError, getPasswordError } from '../utils/validation';
import { FormField } from '../components/FormField';

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, error } = useUser();

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
        <h1>Register</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="register-form"
          aria-label="Register a new account"
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
            autoComplete="new-password"
            register={register}
            validation={{
              required: 'Password is required',
              validate: (value) => getPasswordError(value) || undefined,
            }}
            error={errors.password}
          />
          <FormField
            id="name"
            label="Full Name"
            type="text"
            placeholder="Full Name"
            autoComplete="name"
            register={register}
            validation={{
              required: 'Name is required',
            }}
            error={errors.name}
          />
          <button type="submit">Register</button>
          {error && (
            <div className="error-text" role="alert" aria-live="polite">
              {error}
            </div>
          )}
          <div className="form-footer">
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
