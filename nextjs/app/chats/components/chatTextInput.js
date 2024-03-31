'use client'

import InputField from "@/components/form/input_field";
import FilledButton from "@/components/buttons/filled-button";
import {useState} from "react";

const ChatTextInput = () => {
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('sending msg:', message);
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