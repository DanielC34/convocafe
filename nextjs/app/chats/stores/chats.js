import {create} from "zustand";
import {useSocketStore} from "@/app/stores/socket";
import axios from "@/http/axios";
import {useAuthStore} from "@/app/stores/auth";

export const useMessageStore = create((set, get) => ({
    messages: {},
    subscribedChatIds: {},
    handleMessageReceived: async (chatId) => {
        if (get().subscribedChatIds[chatId]) {
            return;
        }


        set((state) => {
            const newSubscribedChatIds = {...state.subscribedChatIds};
            newSubscribedChatIds[chatId] = true;
            return ({subscribedChatIds: {...newSubscribedChatIds}});
        })

        try {
            const res = await axios.get(`/messages`, {
                params: {
                    chatId: chatId
                }
            })

            set((state) => {
                const newMessages = {...state.messages};
                newMessages[chatId] = res.data;
                return ({messages: {...newMessages}});
            })
        } catch (e) {
            console.log(e)
            return;
        }


        useSocketStore.getState().socket.on(`message/${chatId}`, (message) => {

            if (message?.sender?.id === useAuthStore.getState().user.id) {
                return;
            }

            set((state) => {
                const newMessages = {...state.messages};
                if (!newMessages[chatId]) {
                    newMessages[chatId] = [message];
                } else {
                    newMessages[chatId].push(message);
                }
                return ({messages: {...newMessages}});
            })
        });


    },
    sendMessage: async (message, chatId) => {
        try {
            const res = await axios.post('/messages', message, {
                query: {
                    chatId: chatId
                }
            })

            set((state) => {
                const newMessages = {...state.messages};
                if (!newMessages[chatId]) {
                    newMessages[chatId] = [res.data];
                } else {
                    newMessages[chatId].push(res.data);
                }
                return ({messages: {...newMessages}});
            })

        } catch (e) {
            console.log(e)
        }
    }
}));


export const useChatStore = create((set, get) => ({
    loading: false,
    chats: [],
    selectedChat: null,
    selectChat: (chatID) => set({selectedChat: chatID}),
    findChat: async (chatID) => {
        await get().fetchChats();
        return get().chats.find(chat => chat.id === chatID);
    },

    getOrCreateChat: async (recipientId) => {
        const chat = get().chats.find(chat => chat.participants.find(user => user.id === recipientId));
        if (chat) return chat;

        try {
            const res = await axios.post('/chats', {}, {params: {recipientId}});
            const newChat = res.data;

            set((state) => ({chats: [...state.chats, newChat]}));
            return newChat;
        } catch (e) {
            console.log(e)
        }

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