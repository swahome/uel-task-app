import React, { useState } from 'react';
import { addUser, hashPassword, getUserByEmail } from './db';
import { Link } from 'react-router-dom';
import './index.css';
import { useNavigate } from 'react-router-dom';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');
    const [name, setName] = useState('');
    const [errorMessages, setErrorMessages] = useState([]); // Add this line

    const navigate = useNavigate();
    const handleRegistration = async () => {

        //check name
        if (!name) {
            // Handle registration failure
            //add error message
            setErrorMessages(['Name is required']);
            return;
        }
        //check email
        if (!email) {
            // Handle registration failure
            //add error message
            setErrorMessages(['Email is required']);
            return;
        }
        //check valid email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // Handle registration failure
            //add error message
            setErrorMessages(['Invalid email']);
            return;
        }
        //check password length
        if (!password || password.length < 6) {
            // Handle registration failure
            //add error message
            setErrorMessages(['Password must be at least 6 characters long']);
            return;
        }
        //check confirm password
        if (password !== confirmPassword) {
            // Handle registration failure
            //add error message
            setErrorMessages(['Password and confirm password do not match']);
            return;
        }
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
                <img alt="logo" src="/logotick.png" width="120px" className='logo' />
            </div>
            <h2>Registration</h2>
            {/* Add this erroe messages if present make it red */}
            {errorMessages.map((message) => (
                <div className='error' key={message}>{message}</div>
            ))}
            <form>

                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Email Address:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Confirm Password:</label>
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassowrd(e.target.value)} />

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
