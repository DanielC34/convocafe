import React from "react";
import { useAuth } from "../../context/AuthProvider";

const UserDetails = () => {
  const [authUser] = useAuth;
  console.log("Auth User:", authUser);

  if (!authUser) {
    return null;
  }

  return (
    <div className="px-6 py-4 border-b border-gray-700">
      <h2 className="text-lg font-semibold">{authUser.user.fullname}</h2>
      <p className="text-sm">{authUser.user.email}</p>
    </div>
  );
};

export default UserDetails;
