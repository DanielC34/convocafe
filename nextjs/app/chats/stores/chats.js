import {create} from "zustand";
import {useSocketStore} from "@/app/stores/socket";
import axios from "@/http/axios";

export const useMessageStore = create((set) => ({
    messages: {},
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


export const useChatStore = create((set, get) => ({
    loading: false,
    chats: [],
    selectedChat: null,
    selectChat: (chatID) => set({selectedChat: chatID}),
    findChat : (chatID) => {
        return get().chats.find(chat => chat.id === chatID);
    },
    fetchChats: async () => {
        try {
            set((state) => ({loading: true}));
            const res = await axios.get('/chats');
            set((state) => ({chats: res.data}))
        } catch (e) {
            console.log(e)
        } finally {
            set((state) => ({loading: false}));
        }
    }
}));