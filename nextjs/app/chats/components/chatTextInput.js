'use client'

import InputField from "@/components/form/input_field";
import FilledButton from "@/components/buttons/filled-button";
import {useState} from "react";
import {useMessageStore} from "@/app/chats/stores/chats";

const ChatTextInput = ({userID}) => {
    const [message, setMessage] = useState('');
    const storedMessagesData = useMessageStore(state => state.messages);
    const addMessage = useMessageStore(state => state.addMessage);

    const storedMessages = storedMessagesData[userID] || [];
    async function handleSubmit(e) {
        e.preventDefault();

        if (!message.trim()) return;

        const msg = {
            id: storedMessages.length + 1,
            text: message.trim(),
            time: new Date().toLocaleTimeString(),
            isOwner: true,
            receiverID: userID
        };

        addMessage(userID, msg)
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