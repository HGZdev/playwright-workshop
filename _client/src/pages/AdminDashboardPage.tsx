import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetUsers, useDeleteUser } from '../hooks/useAdmin';
import { useUser } from '../hooks/useUser';

export const AdminDashboardPage: React.FC = () => {
  const { users, refetch } = useGetUsers();
  const { deleteUser } = useDeleteUser();
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const success = await deleteUser(id);
      if (success) {
        refetch();
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Name</th>
            <th>Role</th>
            <th>Password</th>
            <th>Actions</th>
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
                  <button onClick={() => navigate(`/admin/user/${user.id}`)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
