import React, { useState } from 'react'
import './InputBox.css'

const InputBox = ({ sendMessage }) => {
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
      <form className="input-box" onSubmit={handleSubmit}>
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

export default InputBox