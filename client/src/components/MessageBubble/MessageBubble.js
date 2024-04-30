import React from 'react'
import './MessageBubble.css'
import PropTypes from 'prop-types' // Importing PropTypes for prop type validation

// Declaring a functional component called MessageBubble that takes text and sender as props
const MessageBubble = ({ text, sender }) => {
  return (
    <div className={`message-bubble ${sender === 'me' ? 'sent' : 'received'}`}>
      <p>{text}</p>
    </div>
  );
};

// Defining prop types for the MessageBubble component(checks that the right things are in the message bubble)
MessageBubble.propTypes = {
  text: PropTypes.string.isRequired, // text prop should be a required string
  sender: PropTypes.oneOf(["me", "other"]).isRequired, // sender prop should be a required string with value 'me' or 'other'
};

export default MessageBubble;