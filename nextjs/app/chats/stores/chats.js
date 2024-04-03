import {create} from "zustand";
import {useSocketStore} from "@/app/stores/socket";

export const useMessageStore = create((set) => ({
    messages: {
        "23": [
            {
                id: 1,
                text: "How is the weather?",
                sender: "Paul Collins"
            },
        ]
    },
    addMessage: (userID, message) => set((state) => {

        console.log('message', message)

        const newMessages = {...state.messages};

        useSocketStore.getState().socket.emit("message", message);

        if (!newMessages[userID]) {
            newMessages[userID] = [message];
        } else {
            newMessages[userID].push(message);
        }

        return ({messages: {...newMessages}});

    }),
}));
