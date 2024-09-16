import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    navigate('/login');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Logging out...</h1>
    </div>
  );
};

export default Logout;
