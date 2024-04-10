import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [picture, setPicture] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    // Logic to handle Signup form
    e.preventDefault();
    setLoading(true);
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: "Warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    // Handle case where password does not match confirmPassword
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match. Try again")
      setLoading(false);
      return;
    }

    try {

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3001/api/user",
        {
          username,
          email,
          password,
        },
        config
      );
      
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate.push("/chats")
    } catch (error) {
      toast({
        title: "Error Occured!!",
        status: "error",
        description: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

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
