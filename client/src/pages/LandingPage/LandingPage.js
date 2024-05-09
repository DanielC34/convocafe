import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import Coffee from "../../components/img/coffee1.png"; 

const LandingPage = () => {
  return (
    <div className="landing-page-contaner">
      <img src={Coffee} alt="Coffee" className="logo-image" />
      <h1 className="landing-page-heading">ConvoCafe</h1>
      <h3>Offline Chatting Platform</h3>
      <div>
        <Link to="/signup">
          <button className="signup-button">
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">Sign Up</span>
          </button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <button className="login-button">
            <span className="transition"></span>
            <span className="gradient"></span>
            <span className="label">Log In</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
