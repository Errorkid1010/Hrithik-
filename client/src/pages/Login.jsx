import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const nav = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate input
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    // Make a POST request using Axios with then and catch
    axios
      .post('http://localhost:3001/login1', {
        username,
        password,
      })
      .then((response) => {
        // Handle successful response
        console.log('Login successful:', response.data);

        nav('/admin/'+username)
        setError('');
        // Redirect or perform additional actions here
      })
      .catch((err) => {
        // Handle error response
        console.error('Login failed:', err);
        setError('Invalid username or password.');
      });
  };

  return (
    <div  >
       <div className='heading'>
                <h2 >Login</h2>
        </div>

        <div className="box-container">
      <form
        onSubmit={handleSubmit}
      
      >
        <div>
          <label className='me-4' htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            style={{ flex: 1 }}
          />
        </div>
        <div  >
          <label className='me-4' htmlFor="password">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ flex: 1 }}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit">
          Login
        </button>
      </form>
      </div>
    </div>
  );
}

export default Login;
