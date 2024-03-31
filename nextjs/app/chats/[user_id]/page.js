import FilledButton from "@/components/buttons/filled-button";
import ChatListView from "@/app/chats/components/chatList";
import ChatTextInput from "@/app/chats/components/chatTextInput";
import Divider from "@/components/divider";

export default function Page({params}) {

    return (
        <>
            <div className="
                w-full py-1
                flex justify-between items-center
            ">
                <h2 className="text-2xl">Paul George</h2>
                <div className="
                    flex justify-end items-center
                    gap-2.5
                ">
                    <FilledButton>Logout</FilledButton>
                </div>
            </div>

            <Divider/>
            {/*<div className="overflow-auto h-10"></div>*/}
            <ChatListView/>
            <ChatTextInput/>
        </>
    )
}