'use client'

import FilledButton from "@/components/buttons/filled-button";
import ChatListView from "@/app/chats/components/chatList";
import ChatTextInput from "@/app/chats/components/chatTextInput";
import Divider from "@/components/divider";
import {useUserStore} from "@/app/chats/stores/users";
import {useParams, useRouter} from "next/navigation";
import {useEffect} from "react";
import {useMessageStore} from "@/app/chats/stores/chats";

export default function Page() {
    const router = useRouter();
    const params = useParams()
    const storedUsers = useUserStore(state => state.users)
    const setSelectedUser = useMessageStore(state => state.setSelectedUserID)
    const userID = params.user_id;

    const foundUser = storedUsers.find(user => `${user.id}` === userID);

    useEffect(() => {
        if (!foundUser) {
            router.push('/chats')
        }
    }, [storedUsers, userID]);

    if (!foundUser) {
        return null
    }

    setSelectedUser(+userID)

    return (
        <>
            <div className="
                w-full py-1
                flex justify-between items-center
            ">
                <h2 className="text-2xl"> {foundUser.username}</h2>
                <div className="
                    flex justify-end items-center
                    gap-2.5
                ">
                    <FilledButton>Logout</FilledButton>
                </div>
            </div>

            <Divider/>
            <ChatListView userID={userID}/>
            <ChatTextInput userID={userID}/>
        </>
    )
}