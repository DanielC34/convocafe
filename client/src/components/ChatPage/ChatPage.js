import React from "react";
import "./ChatPage.css";
import { isAuthenticated, signout } from "../../backend";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate(); //Initialize navigation
  const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

  //Function to handle signout action
  const onSignout = () => {
    signout(); //Perform signout action
    console.log("User signed out");
    navigate("/signin");
  };

  return !authenticatedUser ? (
    <h1>Please sign in</h1>
  ) : (
    <div className="dashboard">
      <button onClick={onSignout}>Sign Out</button>
      <h1>Hello, {authenticatedUser.user.name}</h1>
    </div>
  );
};

export default Chat;
