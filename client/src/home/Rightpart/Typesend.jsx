import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage";

function Typesend() {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    if (message) {
      try {
        await sendMessages(message, file); // Assuming sendMessages can also handle file
        setMessage("");
        setFile(null); // Clear the file after sending
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

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
