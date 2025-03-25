// import React from 'react';
import { Navigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element: Element }) => {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

  if (!isAdminLoggedIn) {
    return <Navigate to="/SignIn" />;
  }

  return Element;
};

export default PrivateRoute;
