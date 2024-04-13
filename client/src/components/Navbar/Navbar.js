import React from 'react'
import './Navbar.css'

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="brand-text">ConvoCafe</span>
        </div>
        <div className="nav-links">
          <button className="nav-btn">Create Group</button>
          <button className="nav-btn">Profile</button>
          <button className="nav-btn">Settings</button>
          {/* <button className="signout-button" onClick={onSignout}>
            Sign Out
          </button> */}
        </div>
      </nav>
    );
}

export default Navbar