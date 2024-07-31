import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

const Typesend = () => {
  const [message, setMessage] = useState(""); //State to manage the message input
  const { loading, sendMessages } = useSendMessage(); //Custom hook to manage sending messages

  //Handle form submission
  const handleSubmit = async (e) => {
    console.log(e); //Log the event for debugging
    e.preventDefault(); //Prevent default form submission

    if (message) {
      try {
        await sendMessages(message);  //Send the message(file attachement to be implemented later)
        setMessage(""); //Clear the message input after sending the message
      } catch (error) { 
        console.error("Failed to send message:", error); //Log any errors
      }
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh]  bg-gray-800">
        <div className=" w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border-gray-700 rounded-lg outline-none mt-1 px-4 py-2 w-full"
          />
        </div>
        <button type="submit">
          <IoSend className="text-3xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
