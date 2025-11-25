import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';
import { useUser } from '../hooks/useUser';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login: loginHook, error } = useLogin();
  const { login: loginContext } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await loginHook(username, password);

    if (response?.token) {
      const { user, token } = response;
      if (!user) {
        return;
      }
      loginContext(user, token);

      if (user.role === 'admin') {
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
        <form data-testid="login-form" onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="login-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password-input"
            />
          </div>
          <button type="submit" data-testid="login-button">
            Login
          </button>
          {error && (
            <div data-testid="error-message" className="error-text">
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
