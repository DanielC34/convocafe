import React, { useState } from 'react'
import './InputBox.css'
import Send from '../../pages/img/Send.png'

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
          <img
            src={Send}
            alt="Send"
            style={{ width: "30px", cursor: "pointer", marginRight: "2px" }}
          />
        </div>
      </form>
    );
}

export default InputBox