import React, { useState } from 'react';
import { addUser, hashPassword, getUserByEmail } from './db';
import { Link } from 'react-router-dom';
import './index.css';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMessages, setErrorMessages] = useState([]); // Add this line

    const navigate = useNavigate();
    const handleRegistration = async () => {
        // Validate email and password

        //check email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            // Handle registration failure
            //add error message
            setErrorMessages(['Email already exists']);
            return;
        }

        //hash password
        const hashedPassword = await hashPassword(password);

        console.log("hashed password", hashedPassword);

        // Create a new user entry in the 'users' object store
        const user = { email, password: hashedPassword, name };
        await addUser(user);

        // Redirect to the login page after successful registration
        // You can use React Router or any other method for redirection
        //navigate to login page
        navigate('/login');

    };

    return (
        <div className='container'>
            <div className="logo-container ">
                <img alt="logo" src="/tasks.png" width="120px" className='logo' />
            </div>
            <h2>Registration</h2>
            {/* Add this erroe messages if present make it red */}
            {errorMessages.map((message) => (
                <div className='error' key={message}>{message}</div>
            ))}
            <form>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <button type="button" onClick={handleRegistration}>
                    Register
                </button>
            </form>
            <div className='center'>
                <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default RegistrationPage;
