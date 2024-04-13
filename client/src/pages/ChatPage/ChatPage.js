import React from "react";
import "./ChatPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ChatBox from "../../components/ChatBox/ChatBox";
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
    <div className="chat-page">
      <div className="sidebar-content">
        <Sidebar /> {/*Sidebar content goes here*/}
      </div>
      <div className="chat-window">
        {/*Chat window content goes here*/}
        <Navbar />
          <h1>Chat Window, {authenticatedUser.user.name}</h1>
          <ChatBox />
      </div>
      <button className="signout-button" onClick={onSignout}>
        Sign Out
      </button>
    </div>
  );
};

export default Chat ;
