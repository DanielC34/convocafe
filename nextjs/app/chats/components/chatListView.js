'use client'

import ChatTile from "@/app/chats/components/chatTile";
import {useAuthStore} from "@/app/stores/auth";
import {useChatStore} from "@/app/chats/stores/chats";
import {useEffect} from "react";

const ChatListView = () => {
    const fetchChats = useChatStore(state => state.fetchChats)
    const loading = useChatStore(state => state.loading)
    const authLoading = useAuthStore(state => state.loading)
    const chats = useChatStore(state => state.chats)

    useEffect(() => {
        fetchChats()
    }, [])

    return (
        <div className="
            w-full h-full flex-col justify-start items-start inline-flex
            overflow-y-auto
            divide-y-2
        ">

            {

                 (loading || authLoading) ? skeletonLoader() :
                     chats.map((chat) => (
                         <ChatTile
                             key={chat.id}
                             chat={chat}
                         />
                     ))
            }
        </div>

    )
}


const skeletonLoader = () => {
    return (
        <div className=" w-full flex-col justify-start items-start inline-flex">
            {Array(5).fill(5).map((_, index) => (
                <div key={index} className="w-full h-10 bg-gray-50 animate-pulse rounded-md mx-3 mb-2"></div>
            ))}

        </div>
    )
}

export default ChatListView;