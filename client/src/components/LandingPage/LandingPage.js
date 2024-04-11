import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
// import Coffee from "../../components/img/coffee1.png";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
          <h1 className="landing-page-heading">ConvoCafe</h1>
          <h3>Offline Chatting Platform</h3>
        <div className="buttons-container">
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
            <Link to="/signin">
              <button className="login-button">Log In</button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default LandingPage;
