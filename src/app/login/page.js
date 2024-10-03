"use client"; 
// Client-side component, meaning it will be run in the browser, not on the server.
import { useState } from 'react';
// Used to create and manage component state (e.g., variables like email and password).
import './login.css'; 
// Import the CSS file
import { supabase } from '../../utils/supabaseClient'; 
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter(); // Initialize the router
  const [email, setEmail] = useState('');
  // Sets up state to store email entered by user
  const [password, setPassword] = useState('');
  // Sets up state to store password entered by user
  const [errorMessage, setErrorMessage] = useState('');
  // Sets up state to store any error message if login fails

  const handleLogin = async (e) => {
    // Function called when user clicks the login button
    e.preventDefault();
    // Prevents page from refreshing when form is submitted
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message); // Set error message if login fails
    } else {
      //Redirect to dashboard after successful login
      router.push('/dashboard');
    }
  };

  return (
    <div className="login-container"> {/* Apply the login-container class */}
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          className="input-field" // Apply the input-field class
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          className="input-field" // Apply the input-field class
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="login-button" type="submit">Login</button> {/* Apply the login-button class */}
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Apply the error-message class */}
    </div>
  );
}
