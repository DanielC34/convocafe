import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUser";

const Users = () => {
  const [allUsers, loading] = useGetAllUsers(); //Fetch all users and loading state
  console.log(allUsers); //Log the list of all users (for debugging purposes)
  
  return (
    <div>
      { /*Header for messages */}
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>

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
    </div>
  );
}

export default Users;
