import React, { useEffect, useState } from "react";
import FilledButton from "@/components/buttons/filled-button";
import { useUserStore } from "@/app/chats/stores/users";

const AddGroupUserModel = ({ onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
  
  const { users, loading, fetchUsers } = useUserStore();

  useEffect(() => {
    if (isModalOpen) {
      //Fetch users when modal opens
      console.log("Fetching users...");
      fetchUsers();
     }
  }, [isModalOpen, fetchUsers])

  console.log("Users: ", users);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value)
    };

    const handleUserCardClick = (userId) => {
        setSelectedUsers((prevSelectedUsers) => {
            if (prevSelectedUsers.includes(userId)) {
                return prevSelectedUsers.filter((id) => id !== userId)
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    };

    const handleCreateGroup = async () => {
        try {
          //Perform group creation logic here(e.g. API call)
          console.log(`Creating group "${groupName}" with users:`, selectedUsers);

          //Make API call to create the group
          const response = await fetch("/groups", {
            method: "POST",
            headers: {
              "Content": "application/json",
            },
            body: JSON.stringify({
              groupName,
              selectedUsers,
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to create group");
          }

          //Reset state and close modal
          setGroupName('');
          setSelectedUsers([]);
          setIsModalOpen(false);
          onClose(); //Close modal
        } catch (error) {
          console.error("Error creating group: ", error);
        }
    };

    return (
      <div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 w-96 relative">
              
              {/*Modal Header */}
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Create Group
              </h2>
              <button
                className="text-red-600 hover:text-red-800 bg-red-200 px-3 py-1 rounded"
                onClick={onClose}
                style={{ marginLeft: "auto" }}
              >
                Close
              </button>

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
                      selectedUsers.includes(user.id)
                        ? "bg-blue-100"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleUserCardClick(user.id)}
                  >
                    {user.username}
                  </div>
                ))}
              </div>

              {/*Create Group Button */}
              <div className="mt-6 flex justify-center">
                <FilledButton type="primary" onClick={handleCreateGroup}>
                  Create Group
                </FilledButton>
              </div>
            </div>
          </div>
        )}
        {/*Button to open User Selection Modal */}
        <FilledButton stretch type="secondary" onClick={openModal}>
          + Add User to Group
        </FilledButton>
      </div>
    );
};

export default AddGroupUserModel;
