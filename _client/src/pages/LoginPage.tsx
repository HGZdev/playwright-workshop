import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/login', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="flex-center">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center' }}>Mini Bank</h1>
        <form
          data-testid="login-form"
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              data-testid="login-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              data-testid="password-input"
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <button type="submit" data-testid="login-button">
            Login
          </button>
          {error && (
            <div data-testid="error-message" className="error-text" style={{ textAlign: 'center' }}>
              {error}
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
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
