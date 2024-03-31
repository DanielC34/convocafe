import {create} from "zustand";

export const useUserStore = create((set) => ({
    users: [
        {
            id: 1,
            username: "Paul George",
            email: "paul@gmail.com"
        }
    ]

}));
