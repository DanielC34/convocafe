'use client'

import FilledButton from "@/components/buttons/filled-button";
import ChatTextInput from "@/app/chats/components/chatTextInput";
import Divider from "@/components/divider";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import MessagesListView from "@/app/chats/components/messageListView";
import {useChatStore} from "@/app/chats/stores/chats";
import {useAuthStore} from "@/app/stores/auth";

export default function Page({params}) {
    const findChat = useChatStore(state => state.findChat)
    const selectChat = useChatStore(state => state.selectChat)
    const authUser = useAuthStore(state => state.user);
    const chatId = params.id;
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [recipient, setRecipient] = useState(null);

    const initialLoad = async () => {
        setLoading(true);
        try {
            const fetchedChat = await findChat(chatId);

            if (!fetchedChat) {
                router.push('/chats')
                return
            }
            selectChat(chatId)

            if (fetchedChat.participants) {
                const recipient = fetchedChat.participants.find((user) => user.id !== authUser?.id)
                setRecipient(recipient)
            }
        } catch (e) {
            console.log(e)
            router.push('/chats')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        initialLoad();
    }, [authUser]);


    return loading ? <h2>Loading...</h2> : (
        <>
            <div className="
                w-full py-1
                flex justify-between items-center
            ">
                <h2 className="text-2xl"> {recipient?.username}</h2>
                <div className="
                    flex justify-end items-center
                    gap-2.5
                ">
                    <FilledButton>Logout</FilledButton>
                </div>
            </div>

            <Divider/>
            <MessagesListView chatId={chatId}/>
            <ChatTextInput chatId={chatId} recipientId={recipient?.id}/>
        </>
    )
}