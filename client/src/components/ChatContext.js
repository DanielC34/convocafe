import React, { createContext, useContext, useState } from 'react';

// Create a special box to store chat information
const ChatContext = createContext();

// Custom tool to get information from the special box
export const useChatContext = () => {
    return useContext(ChatContext);
};

// ChatProvider container that holds chat-related things for the app
export const ChatProvider = ({ children }) => {
  //State to manage selected contact. (Remember the name of the person i want to chat with)
  const [selectedContact, setSelectedContact] = useState("");

  //Function to handle chat click events(Button to start chatting with a specific person)
  const handleChatClick = (contactName) => {
    setSelectedContact(contactName);
  };

  return (
    <ChatContext.Provider value={{ selectedContact, handleChatClick }}>
      {children}
    </ChatContext.Provider>
  );
};