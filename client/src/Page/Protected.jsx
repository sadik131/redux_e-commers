import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedIn } from '../redux/auth/authSlice';

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedIn);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default Protected;
