import {create} from "zustand";
import {io} from "socket.io-client";

export const useSocketStore = create((set, get) => ({
    socket: null,
    connect: (url) => {

        if (get().socket) {
            return;
        }

        const socket = io(url);

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        socket.on('connect_error', (error) => {
            console.error('Connection error: ', error);
        });


        set({socket});
    },

}))