import React from "react";
import { useAuth } from "../../context/AuthProvider";

const UserDetails = () => {
  const [authUser] = useAuth; //Get the authenticated user from context
  console.log("Auth User:", authUser); //Log the authenticated user to console (for debugging purposes)

  //if no authenticated user is found, don't render anything(null)
  if (!authUser) {
    return null;
  }

  //Render user details if authenticated user exists
  return (
    <div className="px-6 py-4 border-b border-gray-700">
      <h2 className="text-lg font-semibold">{authUser.user.fullname}</h2>
      <p className="text-sm">{authUser.user.email}</p>
    </div>
  );
};

export default UserDetails;
