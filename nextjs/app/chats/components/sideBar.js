"use client";

import Image from "next/image";
import React, { useDebugValue, useState } from "react";
import AddGroupUserModel from "./models/addGroupModel";
import FilledButton from "@/components/buttons/filled-button";
import { useModalStore } from "@/app/chats/stores/modal";
import ChatListView from "@/app/chats/components/chatListView";
import { useAuthStore } from "@/app/stores/auth";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const openAddUserModel = useModalStore((state) => state.openAddUserModal);
  const openAddGroupModel = useModalStore((state) => state.openAddGroupModal);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  return (
    <>
      <div
        className="
                w-full py-3 px-3
                flex justify-between items-center
            "
      >
        <Image
          src="/logo.png"
          alt="user logo"
          height="40"
          width="40"
          className="w-auto h-auto"
        />
      </div>
      <ChatListView />

      <div className="py-2 space-y-2">
        <FilledButton stretch type="primary" onClick={openAddUserModel}>
          Add user
        </FilledButton>

        <FilledButton stretch type="secondary" onClick={openAddGroupModel}>
          Create Group
        </FilledButton>
      </div>
      <UserDetails />
    </>
  );
};

const UserDetails = () => {
  const authUser = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clear);
  const router = useRouter();

  const onClick = () => {
    clearUser();
    router.push("/get-started");
  };

  return (
    <div
      className="
            w-full py-2 px-2
            flex flex-col justify-between items-start
        "
    >
      <h2 className="text-xl"> {authUser?.username}</h2>
      <p className="mb-2 text-sm"> {authUser?.email}</p>

      <FilledButton dense stretch onClick={onClick}>
        Logout
      </FilledButton>
    </div>
  );
};

export default SideBar;
