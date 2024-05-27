import React from "react";
import Search from "../Sidebar/Search";
import Users from "../Sidebar/Users";
import UserDetails from "../Sidebar/UserDetails";
import Logout from "../Sidebar/Logout";

const Left = () => {
  return (
    <div className="w-full bg-black text-gray-300">
      {/* <UserDetails /> */}
      <Search style={{ marginBottom: "60px" }} />
      <div
        className=" flex-1  overflow-y-auto"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <Users />
      </div>
      <Logout />
    </div>
  );
}

export default Left;
