import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers, useUpdateUser } from '../hooks/useAdmin';
import { useUser } from '../hooks/useUser';

export const EditUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user: sessionUser, loading: sessionUserLoading } = useUser();
  const { users, loading: usersLoading } = useUsers();
  const { updateUser, error } = useUpdateUser();

  const isLoading = sessionUserLoading || usersLoading;

  const currentUser = useMemo(() => users.find((u) => u.id === Number(id)), [users, id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const success = await updateUser(Number(id), {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      role: formData.get('role') as 'admin' | 'client',
    });
    if (success) {
      navigate('/admin');
    }
  };

  if (isLoading) {
    return (
      <div className="flex-center">
        <div className="card edit-user-page">
          <h1>Loading...</h1>
          <div role="status" aria-live="polite" className="loading-state">
            Loading user data...
          </div>
        </div>
      </div>
    );
  }

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
        <form onSubmit={handleUpdate} className="edit-user-form" aria-label="Edit user information">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
              autoComplete="email"
              aria-required="true"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              defaultValue={currentUser.password}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={currentUser.name}
              autoComplete="name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              disabled={sessionUser?.id === currentUser.id}
              id="role"
              name="role"
              defaultValue={currentUser.role}
              aria-describedby={
                sessionUser?.id === currentUser.id ? 'role-disabled-reason' : undefined
              }
            >
              <option value="client">Client</option>
              <option value="admin">Admin</option>
            </select>
            {sessionUser?.id === currentUser.id && (
              <span id="role-disabled-reason" className="text-sm text-muted">
                You cannot change your own role
              </span>
            )}
          </div>
          <div className="button-group">
            <button type="submit">Update User</button>
            <button type="button" onClick={() => navigate('/admin')}>
              Cancel
            </button>
          </div>
          {error && (
            <div className="error-text" role="alert" aria-live="polite">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
