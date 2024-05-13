'use client'

import InputField from "@/components/form/input_field";
import FilledButton from "@/components/buttons/filled-button";
import {useState} from "react";
import {useMessageStore} from "@/app/chats/stores/chats";

const ChatTextInput = ({chatId}) => {
    const [message, setMessage] = useState('');
    const sendMessage = useMessageStore(state => state.sendMessage);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!message.trim()) return;

        const msg = {
            content: message.trim(),
            chatId
        };

        await sendMessage(msg, chatId)
        setMessage('');
    }


    return <form
        className="my-2 inline-flex gap-2"
        onSubmit={handleSubmit}
    >
        <InputField
            placeholder="Type your message...."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <FilledButton type="primary">Send</FilledButton>
    </form>
}


export default ChatTextInput;