import React from "react";
import Search from "../Left/Search";
import Users from "../Left/Users";
import UserDetails from "../Left/UserDetails";
import Logout from "../Left/Logout";

function Left() {
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
