// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage'; // Import your login page
import DashboardPage from './DashboardPage'; // Import your dashboard page
import CompletedTasksPage from './CompletedTasksPage'; // Import your completed tasks page
import RegistrationPage from './RegistrationPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path="/completed-tasks" element={<CompletedTasksPage/>} />
       
      </Routes>
    </Router>
  );
};



export default App;
