import React from "react";
import "./LandingPage.css";
import Coffee from "../../components/img/coffee1.png"; 

const LandingPage = () => {
  return (
    <div className="landing-page-contaner">
      <img src={Coffee} alt="Coffee" className="logo-image" />
      <h1 className="landing-page-heading">ConvoCafe</h1>
      <h3>Offline Chatting Platform</h3>
        <div>
          <button className="signup-button">Sign Up</button>
        </div>
        <div>
          <button className="login-button">Log In</button>
        </div>
    </div>
  );
};

export default LandingPage;
