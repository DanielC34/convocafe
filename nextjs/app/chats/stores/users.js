import { create } from "zustand";
import axios from "@/http/axios";

export const useUserStore = create((set) => ({
  loading: false,
  users: [],
  // userIDs is an object with user id as key and user object as value
  // this is useful for quick lookups by user id instead of looping through the users array
  userIDs: {},
  addUser: (user) =>
    set((state) => {
      return {
        users: [...state.users, user],
        userIDs: { ...state.userIDs, [user.id]: user },
      };
    }),

  fetchUsers: async () => {
    try {
      set((state) => ({ loading: true }));
      const res = await axios.get("/users");
      set((state) => ({ users: res.data }));
    } catch (err) {
      console.log(err);
    } finally {
      set((state) => ({ loading: false }));
    }
  },
}));
