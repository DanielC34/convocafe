import React from 'react'
import './Navbar.css'
import { signout } from "../../backend";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const navigate = useNavigate(); //Initialize navigation

  const onSignout = () => {
    signout(); //Perform signout action
    console.log("User signed out");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-text">ConvoCafe</span>
      </div>
      <div className="nav-links">
        <button className="nav-btn-group">Create Group</button>
        <button className="nav-btn-profile">Profile</button>
        <button className="nav-btn-signout" onClick={onSignout}>
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar