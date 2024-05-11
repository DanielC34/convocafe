'use client'

import ChatBubble from "@/app/chats/components/chatbubble";
import {useMessageStore} from "@/app/chats/stores/chats";
import {useEffect, useRef} from "react";

const MessagesListView = ({chatId}) => {
    const messagesData = useMessageStore(state => state.messages);
    const handleMessageReceived = useMessageStore(state => state.handleMessageReceived);
    const dummyRef = useRef(null);
    const messages = messagesData[chatId] || [];
    useEffect(() => {
        handleMessageReceived(chatId)
    }, [])

    useEffect(() => {
        if (dummyRef.current) {
            dummyRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messagesData]);

    return (
        <div className="
            w-full h-full flex-col justify-start items-start inline-flex
            overflow-y-auto
        ">
            {messages.map((message) => (
                <ChatBubble
                    key={message.id}
                    message={message}
                />
            ))}
            <div ref={dummyRef} /> {/* Dummy div at the end of the messages list */}
        </div>
    )
}

export default MessagesListView;
