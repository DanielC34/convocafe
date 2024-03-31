'use client'

import ChatBubble from "@/app/chats/components/chatbubble";
import {useMessageStore} from "@/app/chats/stores/chats";

const ChatListView = ({userID}) => {
    const messagesData = useMessageStore(state => state.messages);

    const messages = messagesData[userID] || [];

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

export default ChatListView;
