import {create} from "zustand";

export const useSocketStore = create((set) => ({
    socket: null,
    setSocket: (conn) => set((state) => {
        if (state.socket) {
            // state.socket.disconnect();
            return ({socket: state.socket});
        }
        return ({socket: conn});
    })
}))