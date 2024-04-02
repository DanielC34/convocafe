import {create} from "zustand";

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
}));


export const useUserSelectedStore = create((set) => ({
    userId: 0,
    setUserID: (userID) => set({userId: userID}),
}));

