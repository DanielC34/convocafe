import {create} from "zustand";

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
    selectedUserID: null,
    setSelectedUserID: (userID) => set({selectedUserID: userID}),
    addMessage: (userID, message) => set((state) => {

        console.log('message', message)

        const newMessages = {...state.messages};

        if (!newMessages[userID]) {
            newMessages[userID] = [message];
        } else {
            newMessages[userID].push(message);
        }

        return ({messages: {...newMessages}});

    }),
}));
