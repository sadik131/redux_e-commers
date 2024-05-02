import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedIn } from '../redux/auth/authSlice';

const AdminProtected = ({ children }) => {
  const user = useSelector(selectLoggedIn);

  if (!user) {
    return <Navigate to="/login" replace="true" />;
  }
  if(user && user.role !== "admin"){
    return <Navigate to="/" replace="true"></Navigate>
  }

  return <>{children}</>;
};

export default AdminProtected;
