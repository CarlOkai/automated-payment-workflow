"use client"; // Mark this component as a Client Component

import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient'; 
import './register.css'; // Import the CSS file for styles

// Define the Register component
export default function Register() {
    const [email, setEmail] = useState('');
    // State variable for the user's email input
    const [password, setPassword] = useState('');
    // State variable for the user's password input
    const [errorMessage, setErrorMessage] = useState('');
    // State variable for storing error messages
    
    // Function to handle user registration
    const handleRegister = async (e) => {
        e.preventDefault();
    
        const response = await supabase.auth.signUp({
            email,
            password,
        });
    
        console.log('Response from Supabase:', response); // Log the entire response
    
        const { user, session, error } = response; // Destructure user, session, and error from the response
    
        console.log('User:', user); // Log user details
        console.log('Session:', session); // Log session details
        console.log('Error:', error); // Log error details
    
        if (error) {
            setErrorMessage(error.message);
        } else {
            if (session) {
                console.log('Access Token:', session.access_token); // Log access token if available
            }
            alert('Registration successful! Check your email for a verification link.');
            setEmail('');
            setPassword('');
        }
    };
    
    // Registration form
    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    className="input-field"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    className="input-field"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button className="register-button" type="submit">Register</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
}
