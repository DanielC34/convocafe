'use client'

import SideBar from "@/app/chats/components/sideBar";
import AddUserModal from "@/app/chats/components/models/addUserModel";
import {useModalStore} from "@/app/chats/stores/modal";

const ChatLayout = ({children}) => {

    const isModelOpen = useModalStore(state => state.isOpen)
    const modal = useModalStore(state => state.modal)
    return (
        <div className="flex h-screen">
            <div className="
                w-1/4 max-w-72 bg-[#EEEDE8]
                flex-col justify-start items-start gap-2.5 inline-flex
                divide-x-2
            ">
                <SideBar/>
            </div>
            <div className="
                w-full p-4
                bg-neutral-50
                flex-col justify-stretch items-stretch inline-flex
                px-3
            ">{children}</div>

            {isModelOpen && modal}
        </div>
    );
}

export default ChatLayout;