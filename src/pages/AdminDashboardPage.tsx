import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <h1>Panel Administratora</h1>
        <div className="admin-header-buttons">
          <Link to="/dashboard" aria-label="Przejdź do panelu głównego">
            Panel główny
          </Link>
          <button onClick={handleLogout} type="button" aria-label="Wyloguj się">
            Wyloguj się
          </button>
        </div>
      </div>
      <table className="admin-table">
        <caption className="sr-only">Tabela zarządzania użytkownikami</caption>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">E-mail</th>
            <th scope="col">Imię</th>
            <th scope="col">Rola</th>
            <th scope="col">Hasło</th>
            <th scope="col">Akcje</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              </td>
              <td>{user.password}</td>
              <td>
                <div className="table-actions">
                  <Link
                    to={`/admin/user/${user.id}`}
                    aria-label={`Edytuj użytkownika ${user.email}`}
                  >
                    Edytuj
                  </Link>
                  <button
                    disabled={sessionUser?.id === user.id}
                    onClick={() => handleDeleteClick(user)}
                    className="danger"
                    aria-label={
                      sessionUser?.id === user.id
                        ? 'Nie możesz usunąć własnego konta'
                        : `Usuń użytkownika ${user.email}`
                    }
                  >
                    Usuń
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={!!userToDelete}
        title="Usuń użytkownika"
        message={`Czy na pewno chcesz usunąć użytkownika "${userToDelete?.email}"? Ta operacja jest nieodwracalna.`}
        confirmText="Usuń"
        cancelText="Anuluj"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmButtonClass="danger"
      />
    </div>
  );
};
