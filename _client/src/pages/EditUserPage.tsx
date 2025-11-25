import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers, useUpdateUser } from '../hooks/useAdmin';

export const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { users } = useUsers();
  const navigate = useNavigate();
  const { updateUser, error } = useUpdateUser();

  const currentUser = useMemo(() => users.find((u) => u.id === Number(id)), [users, id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const success = await updateUser(Number(id), {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      role: formData.get('role') as 'admin' | 'client',
    });
    if (success) {
      navigate('/admin');
    }
  };

  if (!currentUser) {
    return (
      <div className="flex-center">
        <div className="card edit-user-page">
          <h1>User Not Found</h1>
          <button type="button" onClick={() => navigate('/admin')}>
            Back to Admin
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-center">
      <div className="card edit-user-page">
        <h1>Edit User</h1>
        <form onSubmit={handleUpdate} className="edit-user-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              defaultValue={currentUser.password}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" defaultValue={currentUser.name} required />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" defaultValue={currentUser.role}>
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="button-group">
            <button type="submit">Update User</button>
            <button type="button" onClick={() => navigate('/admin')}>
              Cancel
            </button>
          </div>
          {error && <div className="error-text">{error}</div>}
        </form>
      </div>
    </div>
  );
};
