import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'admin' | 'client'>('client');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/admin/users');
        const user = response.data.find((u: { id: string }) => u.id === id);
        if (user) {
          setUsername(user.username);
          setPassword(user.password);
          setName(user.name);
          setRole(user.role);
        } else {
          setError('User not found');
        }
      } catch {
        setError('Failed to fetch user details');
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/admin/users/${id}`, {
        username,
        password,
        name,
        role,
      });
      navigate('/admin');
    } catch {
      setError('Failed to update user');
    }
  };

  return (
    <div className="flex-center">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center' }}>Edit User</h1>
        <form
          onSubmit={handleUpdate}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <div>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              id="password"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '100%', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="role" style={{ display: 'block', marginBottom: '5px' }}>
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'admin' | 'client')}
              style={{ width: '100%', boxSizing: 'border-box', padding: '8px' }}
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Update User</button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            style={{ backgroundColor: '#666' }}
          >
            Cancel
          </button>
          {error && (
            <div className="error-text" style={{ textAlign: 'center' }}>
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
