'use client'

import FilledButton from "@/components/buttons/filled-button";
import ChatTextInput from "@/app/chats/components/chatTextInput";
import Divider from "@/components/divider";
import {useParams, useRouter} from "next/navigation";
import {useEffect} from "react";
import MessagesListView from "@/app/chats/components/messageListView";
import {useChatStore} from "@/app/chats/stores/chats";
import {useAuthStore} from "@/app/stores/auth";

export default function Page() {
    const router = useRouter();
    const params = useParams()
    const findChat = useChatStore(state => state.findChat)
    const selectChat = useChatStore(state => state.selectChat)
    const authUser = useAuthStore(state => state.user);
    const chatId = params.id;

    const chat = findChat(chatId);
    let receiver;

    useEffect(() => {
        if (!chat) {
            router.push('/chats')
            return
        }
        selectChat(chatId)

        if (authUser)
            receiver = chat.participants.find((user) => user.id !== authUser?.id)
    }, [authUser]);

    if (!chat) {
        return null
    }

    return (
        <>
            <div className="
                w-full py-1
                flex justify-between items-center
            ">
                <h2 className="text-2xl"> {receiver?.username}</h2>
                <div className="
                    flex justify-end items-center
                    gap-2.5
                ">
                    <FilledButton>Logout</FilledButton>
                </div>
            </div>

            <Divider/>
            <MessagesListView chatId={chatId}/>
            <ChatTextInput chatId={chatId} receiverId={receiver?.id}/>
        </>
    )
}