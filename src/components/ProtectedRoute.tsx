import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContextUser } from '../hooks/useUser';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useContextUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
