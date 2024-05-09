'use client'

import Image from "next/image";
import {useChatStore} from "@/app/chats/stores/chats";
import {useRouter} from "next/navigation";
import {useAuthStore} from "@/app/stores/auth";

const ChatTile = ({chat}) => {
    const router = useRouter();

    const selectedChat = useChatStore(state => state.selectedChat);
    const selectChat = useChatStore(state => state.selectChat);

    const authUser = useAuthStore(state => state.user);

    const activeClass = selectedChat === chat.id ? "bg-[#F5F5DC]" : "";

    async function handleClick(id) {
        selectChat(id);
        router.push(`/chats/${chat.id}`);
    }

    const receiver = chat.participants.find((user) => user.id !== authUser?.id)

    return (
        <div
            className={`
                w-full px-7 py-3 justify-center items-center gap-2 inline-flex
                hover:bg-amber-50 cursor-pointer
                active:bg-[#F5F5DC]
                ${activeClass}
            `}
            onClick={() => handleClick(chat.id)}
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
                {
                    receiver?.username
                }
            </div>
        </div>
    )
}

export default ChatTile;