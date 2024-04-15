import React from "react";
import "./ChatPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import ChatBox from "../../components/ChatBox/ChatBox";
import { isAuthenticated } from "../../backend";

const Chat = () => {
  const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

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
    </div>
  );
};

export default Chat ;
