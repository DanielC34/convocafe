import {create} from "zustand";
import axios from "@/http/axios";

export const useAuthStore = create((set) => ({
    loading: false,
    user: null,
    fetchCurrentUser: async () => {
        try {
            set({loading: true});
            const res = await axios.get('/users/me');
            const user = await res.data;
            set({user});
        } catch (error) {
            console.log(error);
        } finally {
            set({loading: false});
        }
    },
    clear: () => {
        localStorage.removeItem('token');
        set({user: null});
    },
}));