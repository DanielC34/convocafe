'use client'

import ChatBubble from "@/app/chats/components/chatbubble";
import {useMessageStore} from "@/app/chats/stores/chats";
import {useEffect} from "react";

const MessagesListView = ({chatId}) => {
    const messagesData = useMessageStore(state => state.messages);
    const handleMessageReceived = useMessageStore(state => state.handleMessageReceived);

    const messages = messagesData[chatId] || [];
    useEffect(() => {
        handleMessageReceived(chatId)
    }, [])

    return (
        <div className="
            w-full h-full flex-col justify-start items-start inline-flex
            overflow-y-auto
        ">
            {messages.map((message, index) => (
                <ChatBubble key={index} message={message}/>
            ))}
        </div>
    )
}

export default MessagesListView;
