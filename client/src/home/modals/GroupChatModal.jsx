import React from 'react'
import { GrFormClose } from "react-icons/gr";

const GroupChatModal = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg p-6 w-96 text-black justify-center items-center">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Create Group Chat</h2>
            <button className="text-2xl" onClick={onClose}>
              <GrFormClose />
            </button>
          </div>
          <div className="mt-4">
            {/*Add form fields here */}
            <p>Group chat creation creation form comes here</p>
          </div>
        </div>
      </div>
    );
}

export default GroupChatModal