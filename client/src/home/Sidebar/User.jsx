import React from "react";
import useConversation from "../../zustand/useConversation";
import Icon from "../../assets/icon.png";
import { useSocketContext } from "../../context/SocketContext.jsx";

const User = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation(); //Get the current selected conversation and function to set selected conversation from Zustand store
  const isSelected = selectedConversation?._id === user._id; //Check if the current user is in the selected conversation
  const { socket, onlineUsers } = useSocketContext(); //Get socket and onlineUsers from socket context
  const isOnline = onlineUsers.includes(user._id); //Checks if user is online

  
  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={Icon} />
          </div>
        </div>
        <div>
          <h1 className=" font-bold">{user.fullname}</h1>
        </div>
      </div>
    </div>
  );
}

export default User;
