import React, { useState } from "react";
import "./SignUp.css";
import { Link } from 'react-router-dom'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    // Logic to handle Signup form
  };

  return (
    <div className="form-box">
      <form className="form" onSubmit={handleSignup}>
        <span className="title">Sign up</span>
        <span className="subtitle">Create a free account with your email.</span>
        <div className="form-container">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="input"
            required
          />
        </div>
        <button type="submit" className="signup-button">Sign up</button>
      </form>
      <div className="form-section">
        <p>
          Have an account? <Link to="/login">Log in</Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Signup;
