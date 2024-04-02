import {Inter} from "next/font/google";
import "./globals.css";
import ClientLayout from "@/app/client_layout";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Convocate",
    description: "Chat with different people",
};

export default function RootLayout({children}) {
    const socketUrl = process.env.SOCKET_URL || "";
    return (
        <html lang="en">
        <body className={inter.className}>
        {/*<ClientLayout socketURL={socketUrl}>*/}
            {children}
        {/*</ClientLayout>*/}
        </body>
        </html>
    );
}
