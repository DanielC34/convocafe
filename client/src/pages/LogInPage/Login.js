import React, { useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleLogin = (e) => {
     e.preventDefault(); // Prevent the default form submission behavior

     // Add your login logic here, e.g., make an API call to authenticate the user
     console.log("Logging in with email:", email, "and password:", password);

     // Clear the form fields after submission
     setEmail("");
     setPassword("");
   };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleLogin}>
        <span className="title">Log In</span>
        <span className="subtitle">Log in to your account</span>
        <div className="form-container">
          <input
            type="email"
            className="input"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <div className="form-section">
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;