'use client'

import Image from "next/image";
import FilledButton from "@/components/buttons/filled-button";
import {useModalStore} from "@/app/chats/stores/modal";
import ChatListView from "@/app/chats/components/chatListView";
import {useAuthStore} from "@/app/stores/auth";
import {useRouter} from "next/navigation";

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
            <ChatListView/>
            <UserDetails/>
        </>
    );
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