import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUser";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";


const Search = () => {
  const [search, setSearch] = useState(""); //State to manage the search input
  const [allUsers] = useGetAllUsers(); //Fetch all users using custom hook
  const { setSelectedConversation } = useConversation(); // Get the function to set selected conversation from Zustand store
  console.log(allUsers);

//Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;
    //Find a user whose fullname matches the search input
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      //Set the selected conversation is user is found
      setSelectedConversation(conversation);
      setSearch(""); //Clear the search input bar
    } else {
      toast.error("User not found"); //Display the error message if user not found
    }
  };

  
  return (
    <div className=" h-[10vh] mb-4">
      <div className="px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <label className=" border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
              <input
                type="text"
                className="grow outline-none bg-transparent"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
            <button>
              <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
