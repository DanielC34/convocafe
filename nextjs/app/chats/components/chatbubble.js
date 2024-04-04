import Image from "next/image";

const ChatBubble = ({message}) => {

    const containerClass = message.isOwner ? "items-end" : "items-start";
    const bubbleClass =
        message.isOwner ?
            "rounded-tl-lg bg-[#F5F5DC] text-white" :
            "rounded-tr-lg bg-gray-200";

    return (
        <div className={`w-full px-2 py-1 flex-col justify-start gap-2.5 inline-flex ${containerClass}`}>
            <div className={`px-2.5 items-start gap-1.5 inline-flex`}>
                {
                    !message.isOwner && (
                        <div className="p-2 bg-stone-200 rounded-full">
                            <Image
                                src='/account.png'
                                alt="user logo"
                                height="16"
                                width="16"
                                className="w-full h-auto"
                            />
                        </div>
                    )
                }
                <div className="grow shrink basis-0 flex-col justify-center items-start gap-1.5 inline-flex">
                    {
                        message.sender && !message.isOwner && (
                            <p className="text-neutral-400 text-sm font-medium  leading-tight">
                                {message.sender.username || 'You'}
                            </p>
                        )
                    }
                    <div
                        className={`
                            p-2.5 justify-center items-start gap-2.5 inline-flex 
                            max-w-[400px]
                            rounded-bl-lg rounded-br-lg ${bubbleClass}`}>
                        <p
                            className="grow shrink basis-0 text-zinc-700 text-lg font-medium leading-relaxed">
                            {message.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ChatBubble;