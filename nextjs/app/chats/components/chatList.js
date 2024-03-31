import ChatBubble from "@/app/chats/components/chatbubble";

const ChatListView = () => {

    return (
        <div className="
            w-full h-full flex-col justify-start items-start gap-2.5 inline-flex
            overflow-y-auto
        ">
            {messages.map((message, index) => (
                <ChatBubble key={index} message={message}/>
            ))}
        </div>
    )
}


export default ChatListView;





const messages = [
    {
        id: 1,
        text: "Hello",
        sender: "Paul Collins"

    }, {

        id: 2,
        text: "Hi",
        isOwner: true
    },
    {
        id: 3,
        text: "How are you?",
        sender: "Paul Collins"
    },
    {
        id: 4,
        text: "I'm good",
        isOwner: true
    },
    {
        id: 5,
        text: "How is work?",
        sender: "Paul Collins"
    },
    {
        id: 6,
        text: "Work is fine",
        isOwner: true
    },
    {
        id: 7,
        text: "How is your family?",
        sender: "Paul Collins"
    },
    {
        id: 8,
        text: "They are fine",
        isOwner: true
    },
    {
        id: 9,
        text: "How is your health?",
        sender: "Paul Collins"
    },
    {
        id: 10,
        text: "I'm healthy",
        isOwner: true
    },
    {
        id: 11,
        text: "How is your day going?",
        sender: "Paul Collins"
    },
    {
        id: 12,
        text: "It's going well",
        isOwner: true
    },
    {
        id: 13,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 14,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 15,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 16,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 17,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 18,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 19,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 20,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 21,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 22,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 23,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 24,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 25,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 26,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 27,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 28,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 29,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 30,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 31,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
    {
        id: 32,
        text: "It's sunny",
        isOwner: true
    },
    {
        id: 33,
        text: "How is the weather?",
        sender: "Paul Collins"
    },
];