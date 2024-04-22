import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Coffee from "../img/coffee1.png";

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content">
        <div className="logo-container">
          <img src={Coffee} alt="Coffee Cup Icon" className="logo" />
          <h1 className="landing-page-heading">ConvoCafe</h1>
        </div>
        <p className="landing-page-subheading">
          A place you get to chat with different people
        </p>
        <div className="buttons-container">
          <Link to="/signin">
            <button className="login-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Sign up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
