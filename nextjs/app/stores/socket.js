import {create} from "zustand";

export const useSocketStore = create((set) => ({
    socket: null,
    setSocket: (conn) => set({socket: conn})
}))