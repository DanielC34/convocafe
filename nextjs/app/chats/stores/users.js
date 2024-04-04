import {create} from "zustand";
import axios from "@/http/axios";

export const useUserStore = create((set) => ({
    users: [],
    // userIDs is an object with user id as key and user object as value
    // this is useful for quick lookups by user id instead of looping through the users array
    userIDs: {},
    addUser: (user) => set((state) => {
        return ({
            users: [...state.users, user],
            userIDs: {...state.userIDs, [user.id]: user}
        });
    }),
    fetchChatUsers: async () => {
        const res = await axios.get('/chats');
        
        res.data
        const users = await response.json();
        users.forEach(user => {
            set((state) => {
                return ({
                    users: [...state.users, user],
                    userIDs: {...state.userIDs, [user.id]: user}
                });
            });
        });
    },
}));


export const useUserSelectedStore = create((set) => ({
    userId: 0,
    setUserID: (userID) => set({userId: userID}),
}));

