'use client'

import Image from "next/image";
import {useMessageStore} from "@/app/chats/stores/chats";
import {useRouter} from "next/navigation";
import {useUserSelectedStore} from "@/app/chats/stores/users";

const ChatUserTile = ({user}) => {
    const router = useRouter();
    // const selectedUserID = useMessageStore(state => state.selectedUserID);
    const selectedId = useUserSelectedStore(state => state.userId);
    const setSelectedUserID = useUserSelectedStore(state => state.setUserID);

    const selected = selectedId === user.id;
    const activeClass = selected ? "bg-[#F5F5DC]" : "";
    // const activeClass = "bg-[#F5F5DC]";

    async function handleClick(userID) {
        setSelectedUserID(userID);
        router.push(`/chats/${userID}`);
    }

    return (
        <div
            className={`
                w-full px-7 py-3 justify-center items-center gap-2 inline-flex
                hover:bg-amber-50 cursor-pointer
                active:bg-[#F5F5DC]
                ${activeClass}
            `}
            onClick={() => handleClick(user.id)}
        >
            <div className="p-3 bg-stone-200 rounded-full justify-center items-center flex">
                <Image
                    className="w-full h-auto"
                    width={20}
                    height={20}
                    src="/account.png"
                    alt="account icon"
                />
            </div>
            <div
                className="
                    grow shrink line-clamp-1
                    basis-0 text-stone-900 text-sm font-medium
                    leading-relaxed
                ">
                {user.username}
            </div>
        </div>
    )
}

export default ChatUserTile;