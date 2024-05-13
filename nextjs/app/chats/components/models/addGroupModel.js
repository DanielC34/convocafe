import React, { useEffect, useState } from "react";
import FilledButton from "@/components/buttons/filled-button";
import { useUserStore } from "@/app/chats/stores/users";
import axios from "@/http/axios";
import { useChatStore } from "@/app/chats/stores/chats";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/app/chats/stores/modal";

const AddGroupUserModel = ({ onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const createGroupChat = useChatStore((state) => state.createGroupChat);
  const closeModal = useModalStore((state) => state.close);
  const router = useRouter();

  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleUserCardClick = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = { ...prevSelectedUsers };
      if (newSelectedUsers[userId]) {
        delete newSelectedUsers[userId];
        return newSelectedUsers;
      }

      newSelectedUsers[userId] = true;
      return newSelectedUsers;
    });
  };

  const handleCreateGroup = async () => {
    try {
      setLoading(true);
      const userIds = Object.keys(selectedUsers);

      // validate values
      if (!groupName) {
        alert("Group name is required");
        return;
      }

      if (userIds.length < 2) {
        alert("Select at least 2 users to create a group");
        return;
      }

      createGroupChat(groupName, userIds).then((chat) => {
        router.push(`/chats/${chat.id}`);
        closeModal();
      });
    } catch (error) {
      console.error("Error creating group: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-6 w-96 relative">
          {/*Modal Header */}
          <div className="my-4 flex justify-between items-center gap-4">
            <h2 className="text-xl font-semibold">Create Group</h2>
            <FilledButton dense type="danger" onClick={onClose}>
              {" "}
              Close
            </FilledButton>
          </div>

          {/*Group Name input */}
          <label htmlFor="groupName" className="block mb-2">
            Group Name:
          </label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={handleGroupNameChange}
            className="w-full border border-gray-300 rounded-md px-3 py-3 mb-4 focus:outline-none focus:border-blue-500"
          />

          {/*User list display */}
          <div className="grid grid-cols-2 gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className={`p-3 border rounded-md cursor-pointer ${
                  selectedUsers[user.id] ? "bg-amber-50" : "hover:bg-gray-100"
                }`}
                onClick={() => handleUserCardClick(user.id)}
              >
                {user.username}
              </div>
            ))}
          </div>

          {/*Create Group Button */}
          <div className="mt-6 flex justify-center">
            <FilledButton
              type="primary"
              stretch
              isLoading={loading}
              onClick={handleCreateGroup}
            >
              Create Group
            </FilledButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGroupUserModel;
