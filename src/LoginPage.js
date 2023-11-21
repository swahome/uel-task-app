import React, { useState } from 'react';
import { getUserByEmail, hashPassword } from './db';
import './style.css'; // Import the styles
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState([]); // Add this line
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validate email and password

    // Validate against user data in the 'users' object store
    const user = await getUserByEmail(email);
    console.log("email",email);
    console.log("user",user);

    if (user) {
        //check password after hashing the input password
        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== user.password) {
            // Handle login failure
            //add error message
            setErrorMessages(['Invalid password']);
            return;

        }


      // Store the logged-in user's ID in local storage
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);

      console.log("user id",user.id);
      console.log("user email",user.email);

      // Redirect to the dashboard page after successful login
        navigate('/dashboard');
      // You can use React Router or any other method for redirection
    } else {
      // Handle login failure
        //add error message
        setErrorMessages(['Invalid email']);
    }
  };

  return (
    <div className="container">
        <div className="logo-container ">
            <img alt="logo" src="/tasks.png" width="120px" className="logo" />
        </div>
      <h2>Login</h2>
      <form>
        {/* Add this error messages if present make it red */}
        {errorMessages.map((message) => (
          <div className="error" key={message}>
            {message}
          </div>
        ))}
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {/* Add Link to Registration Page*/}
      <div className='center'>
        <Link  to="/register">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
