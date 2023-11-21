import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the user ID from local storage
    localStorage.removeItem('userId');

    // Redirect to the login page or any other desired page
    navigate('/login');
    // You can use React Router or any other method for redirection
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default Logout;
