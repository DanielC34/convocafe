'use client'

import Image from "next/image";
import React, { useDebugValue, useState } from 'react';
import AddGroupUserModel from "./models/addGroupModel";
import FilledButton from "@/components/buttons/filled-button";
import {useModalStore} from "@/app/chats/stores/modal";
import ChatListView from "@/app/chats/components/chatListView";
import {useAuthStore} from "@/app/stores/auth";
import {useRouter} from "next/navigation";

const SideBar = () => {
  const openModal = useModalStore(state => state.open)
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);

  const handleCreateGroupClick = () => {
    //Set state to display add group modal
    setShowAddGroupModal(true);
    console.log("Add group clicked");
  }

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
        <FilledButton stretch type="primary"
          onClick={openModal}
        >
          Add user
        </FilledButton>

        <FilledButton
          stretch
          type="secondary"
          onClick={handleCreateGroupClick}
        >
          Create Group
        </FilledButton>
      </div>

      {/*Remder the add group modal based on showAddGroupModal state */}
      {showAddGroupModal && <AddGroupUserModel onClose={() => setShowAddGroupModal(false)} />}

      <UserDetails />
    </>
  );
};

const AddGroupModal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <FilledButton
          type="secondary"
          stretch
        >Add Group</FilledButton>
        {/*Add content for Add Group Modal */}
      </div>
    </div>
  )
}


const UserDetails = () => {
    const authUser = useAuthStore(state => state.user);
    const clearUser = useAuthStore(state => state.clear);
    const router = useRouter();

    const onClick = () => {
        clearUser();
        router.push('/get-started');
    }

    return (
        <div className="
            w-full py-2 px-2
            flex flex-col justify-between items-start
        ">
            <h2 className="text-xl"> {authUser?.username}</h2>
            <p className="mb-2 text-sm"> {authUser?.email}</p>

            <FilledButton
                dense
                stretch
                onClick={onClick}

            >Logout
            </FilledButton>
        </div>
    )
}

export default SideBar;