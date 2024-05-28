import React, { useState } from "react";
import User from "./User";
import GroupChatModal from "../modals/GroupChatModal";
import { GrGroup } from "react-icons/gr";
import useGetAllUsers from "../../context/useGetAllUser";

const Users = ({ onOpenModal}) => {
  const [allUsers, loading] = useGetAllUsers(); //Fetch all users and loading state

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  console.log(allUsers); //Log the list of all users (for debugging purposes)

  return (
    <div className="relative min-h-screen">
      {/*Header for messages */}
      <div className="flex justify-between items-center px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        <h1 className="flex items-center">
          <span className="mr-10 py-1">Messages</span>
          <button
            className="flex items-center ml-2 text-sm text-white border border-white hover:bg-white hover:text-black px-2 py-1 rounded-md"
            onClick={handleOpenModal}
          >
            <GrGroup className="text-xl " />
            <span className="ml-2">+Group chat</span>
          </button>
        </h1>
      </div>

      {/*Container for the list of users, scorllable overflow */}
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {/*Map through all users and render a User component for each */}
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>

      {/*Modal rendering moved here */}
      <GroupChatModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Users;
