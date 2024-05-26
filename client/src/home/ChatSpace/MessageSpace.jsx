import React, { useEffect } from "react";
import Chatuser from "./Chatuser.jsx";
import Messages from "./Messages.jsx";
import logo from '../../assets/logo.png';
import Typesend from "./Typesend.jsx";
import useConversation from "../../zustand/useConversation.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

const MessageSpace = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="w-full bg-slate-900 text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className=" flex-1 overflow-y-auto"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
};

export default MessageSpace;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="relative">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-ghost drawer-button lg:hidden absolute left-5"
        >
          <CiMenuFries className="text-white text-xl" />
        </label>
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-center">
            {/* <img
              src={logo}
              alt="Coffee logo"
              style={{ width: "40px", height: "40px", marginLeft: "10px" }}
            /> */}
            <span className="font-semibold text-xl">
              Welcome to ConvoCafe, {authUser.user.fullname}!!
            </span>
            <br />
            Pick any of your contacts and start a conversation!!
          </h1>
        </div>
      </div>
    </>
  );
};
