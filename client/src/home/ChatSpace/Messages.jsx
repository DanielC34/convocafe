import React, { useEffect, useRef, useState } from "react";
import Message from "./Message.jsx";
import GroupChatModal from "../modals/GroupChatModal";
import useGetMessage from "../../context/useGetMessage.jsx";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

const Messages = () => {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage(); // listing incoming messages
  console.log(messages);

  const lastMsgRef = useRef();
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // const handleOpenModal = () => {
    //   setIsModalOpen(true);
    // };

    // const handleCloseModal = () => {
    //   setIsModalOpen(false);
    // };



  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [messages]);
  return (
    <div className="relative min-h-screen">
      <div
        className="flex-1 overflow-y-auto"
        style={{ minHeight: "calc(92vh - 8vh)" }}
      >
        {loading ? (
          <Loading />
        ) : (
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}>
              <Message message={message} />
            </div>
          ))
        )}

        {!loading && messages.length === 0 && (
          <div>
            <p className="text-center mt-[20%]">
              Say! Hi to start the conversation
            </p>
          </div>
        )}
      </div>


    </div>
  );
};

export default Messages;
