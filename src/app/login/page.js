"use client"; // This line tells Next.js that this is a Client Component"
import { useState } from 'react';
import './login.css'; // Import the CSS file
import { supabase } from '../../utils/supabaseClient'; // Adjusted path


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      alert('Login successful!');
      // Redirect or perform other actions upon successful login
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
