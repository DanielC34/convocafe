"use client";

import ChatTextInput from "@/app/chats/components/chatTextInput";
import Divider from "@/components/divider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MessagesListView from "@/app/chats/components/messageListView";
import { useChatStore } from "@/app/chats/stores/chats";
import { useAuthStore } from "@/app/stores/auth";
import { isAuth } from "@/utils/auth";

// Defining the ChatByIDPage component
const ChatByIDPage = ({ params }) => {
  // Using custom hooks to access state and functions from stores
  const findChat = useChatStore((state) => state.findChat);
  const selectChat = useChatStore((state) => state.selectChat);
  const authUser = useAuthStore((state) => state.user);
  // Extracting chatId from params
  const chatId = params.id;
  const router = useRouter();

  // Setting up state variables
  const [loading, setLoading] = useState(true);
  const [recipient, setRecipient] = useState(null);

  // Function to load chat information initially
  const initialLoad = async () => {
    setLoading(true);
    try {
      const fetchedChat = await findChat(chatId);

      if (!fetchedChat) {
        router.push("/chats");
        return;
      }
      selectChat(chatId);

      if (fetchedChat.participants) {
        const recipient = fetchedChat.participants.find(
          (user) => user.id !== authUser?.id
        );
        setRecipient(
          fetchedChat.type === "group" ? fetchedChat?.name : recipient?.username
        );
      }
    } catch (e) {
      console.log(e);
      router.push("/chats");
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to trigger initialLoad when authUser changes
  useEffect(() => {
    initialLoad();
  }, [authUser]);

  // Rendering the component based on loading state
  return loading ? (
    <h2>Loading...</h2>
  ) : (
    <>
      <div
        className="
                w-full py-1
                flex justify-between items-center
            "
      >
        <h2 className="text-2xl"> {recipient}</h2>
      </div>

      <Divider />
      <MessagesListView chatId={chatId} />
      <ChatTextInput chatId={chatId} />
    </>
  );
};

// Exporting the component with authentication check
export default isAuth(ChatByIDPage);
