'use client'

import Image from "next/image";
import FilledButton from "@/components/buttons/filled-button";
import UserList from "@/app/chats/components/userList";
import {useModalStore} from "@/app/chats/stores/modal";

const SideBar = () => {
    const openModal = useModalStore(state => state.open)
    return (
        <>
            <div className="
                w-full py-3 px-3
                flex justify-between items-center
            ">
                <Image
                    src='/logo.png'
                    alt="user logo"
                    height="40"
                    width="40"
                    className="w-auto h-auto"
                />

                <FilledButton
                    dense
                    type="secondary"
                    onClick={openModal}
                >Add user</FilledButton>
            </div>
            <UserList/>
        </>
    );
}

export default SideBar;