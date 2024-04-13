import React, { useState } from 'react'
import './ChatBox.css'

const ChatBox = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            sendMessage(message);
            setMessage('');
        }
    };
  
  
    return (
      <form className="chat-box" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message here..."
            value={message}
            onChange={handleChange}
            className="message-input"
          />
          <button type="submit" className="send-btn">
            Send
          </button>
        </div>
      </form>
    );
}

export default ChatBox