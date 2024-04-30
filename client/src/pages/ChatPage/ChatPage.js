import React from "react";
import "./ChatPage.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { isAuthenticated } from "../../auth";
import InputBox from "../../components/InputBox/InputBox";
import ChatBox from "../../components/ChatBox/ChatBox";

const Chat = () => {
  const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

  const messages = [
    { text: "Hello there", sender: "me" },
    { text: "Hi! How can i help you?", sender: "other" },
  ];

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
        <ChatBox messages={messages} />
        <InputBox />
      </div>
    </div>
  );
};

export default Chat;
