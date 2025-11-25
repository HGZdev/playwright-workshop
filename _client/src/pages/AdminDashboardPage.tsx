import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers, useDeleteUser } from '../hooks/useAdmin';
import { useUser } from '../hooks/useUser';
import { ConfirmModal } from '../components/ConfirmModal';
import type { User } from '../types';

export const AdminDashboardPage: React.FC = () => {
  const { users, refetch } = useUsers();
  const { deleteUser } = useDeleteUser();
  const navigate = useNavigate();
  const { logout, user: sessionUser } = useUser();
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      const success = await deleteUser(userToDelete.id);
      if (success) {
        refetch();
      }
      setUserToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} aria-label="Logout from admin dashboard">
          Logout
        </button>
      </div>
      <table className="admin-table">
        <caption className="sr-only">User Management Table</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Password</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </td>
              <td>{user.password}</td>
              <td>
                <div className="table-actions">
                  <button
                    onClick={() => navigate(`/admin/user/${user.id}`)}
                    aria-label={`Edit user ${user.username}`}
                  >
                    Edit
                  </button>
                  <button
                    disabled={sessionUser?.id === user.id}
                    onClick={() => handleDeleteClick(user)}
                    className="danger"
                    aria-label={
                      sessionUser?.id === user.id
                        ? 'Cannot delete your own account'
                        : `Delete user ${user.username}`
                    }
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={!!userToDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${userToDelete?.username}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmButtonClass="danger"
      />
    </div>
  );
};
