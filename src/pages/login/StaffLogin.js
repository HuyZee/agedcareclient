import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State variable for error message
  const { staffLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login/staff', { email, password });
      const { token, user } = response.data;

      // Store the token in local storage
      localStorage.setItem('jwtToken', token);

      // Redirect to dashboard or protected route
      await staffLogin(user);

    } catch (error) {
      console.error('Error logging in:', error.message);
      setError('Invalid email or password'); // Set error message
    }
  };

  return (
    <div className='Login' >
      <h2>Staff Login</h2>
      <button onClick={() => window.history.back()}>Back</button>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
};

export default StaffLogin;
