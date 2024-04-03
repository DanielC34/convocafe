'use client';

import {io} from "socket.io-client";
import {useEffect} from "react";
import {useSocketStore} from "@/app/stores/socket";

export default function ClientLayout({socketURL, children}) {

    const socket = io("http://localhost:3001");
    const setSocket = useSocketStore(state => state.setSocket);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(`Connected to server: ${socket.id}`);
        });

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });

    //     socket.on("connect_error", (error) => {
    //         console.error("Connection error: ", error);
    //
    //     });
    //
    //     socket.on("connect_timeout", (timeout) => {
    //         console.error("Connection timeout: ", timeout);
    //
    //     });
    //
    //     socket.on("error", (error) => {
    //         console.error("Error: ", error);
    //
    //     });
    //
    //     socket.on("reconnect", (attempt) => {
    //         console.log("Reconnected to server on attempt: ", attempt);
    //     });
    //
        setSocket(socket);
        return () => {
            console.log(`Disconnecting from server ${socket.id}`);
            // socket.disconnect();
        };
    }, []);
    return children
}
