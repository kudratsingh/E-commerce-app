// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/slices/userSlice';  // Import the action
import Form from '../components/Form';
import { Link, useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';

import './Login.css';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {  // Basic validation
            console.log("Submitting:", { email, password });
            
            // Dispatch the action and handle response using .then()
            dispatch(login({ email, password }))
            .then(unwrapResult)
            .then(response => {
                console.log("Login response:", response);
                if (response && response.token) {
                    navigate('/');  // Navigate to home page after successful login
                }
            })
            .catch(error => {
                console.log("Error:", error.message);
            });
            
        } else {
            console.log("Fields are empty.");
        }
    }    
    
    return (
        <div className='login-container'>
            <h1 className="login-header">Login</h1>
            <Form 
                onSubmit={handleSubmit}
                fields={[
                    {
                        name: 'email',
                        type: 'email',
                        value: email,
                        onChange: (e) => setEmail(e.target.value),
                        placeholder: 'Enter Email',
                    },
                    {
                        name: 'password',
                        type: 'password',
                        value: password,
                        onChange: (e) => setPassword(e.target.value),
                        placeholder: 'Enter Password',
                    }
                ]}
            />
            <button 
                className='form-button' 
                type="submit" 
                onClick={handleSubmit}
                disabled={loading}  // Disable the button during API call
            >
                {loading ? "Loading..." : "Login"}
            </button>
            <div className='login-links'>
                <Link to="/register"> Not a user? Register here. </Link>
            </div>
            
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default Login;