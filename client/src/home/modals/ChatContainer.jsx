import React, { useState } from "react";
import Users from "../Sidebar/Users";
import Messages from "../ChatSpace/Messages";
import GroupChatModal from "./GroupChatModal";

const ChatContainer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Users onOpenModal={handleOpenModal} />
      <Messages isModalOpen={isModalOpen} onCloseModal={handleCloseModal} />
      <GroupChatModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ChatContainer;
