'use client';

import {io} from "socket.io-client";
import {useEffect} from "react";
import {useSocketStore} from "@/app/stores/socket";

export default function ClientLayout({socketURL, children}) {
    const connectSocket = useSocketStore(state => state.connect);

    useEffect(() => {
        connectSocket(socketURL);
        return () => {
            console.log(`Disconnecting from server`);
        };
    }, []);
    return children
}
