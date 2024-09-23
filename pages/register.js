// Import necessaey hooks from React and the Supabase client
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

// Define the Register component
export default function Register() {
    // State variable for the user's email input
    const [email, setEmail] = useState('');
    // State variable for the user's password input
    const [password, setPassword] = useState('');
    // State variable for storing error messages
    const [errorMessage, setErrorMessage] = useState('');

    //Function to handle user registration
    const handleRegister = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        // Call Supabase's signUp method with the email and password provided by the user
        const { error } = await supabase.auth.signUp({
            email,
            password,
        });
        // Check if there was an error during registration
        if (error) {
            setErrorMessage(error.message); // Set the error message to be displayed
        } else {
            alert('Registration successful! Check your email for a verification link.');
            setEmail(''); // Clear the email input field
            setPassword(''); // Clear the password input field
        }
    };
    // Render the registration form
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
    );
}
