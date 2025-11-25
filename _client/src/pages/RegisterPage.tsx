import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { register, error } = useUser();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const success = await register(username, password, name);
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="flex-center">
      <div className="card register-page">
        <h1>Register</h1>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
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
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit">Register</button>
          {error && <div className="error-text">{error}</div>}
          <div className="form-footer">
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
