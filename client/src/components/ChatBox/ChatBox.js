import React from 'react'
import MessageBubble from '../MessageBubble/MessageBubble'

const ChatBox = ({ messages }) => {
  return (
    <div className='chat-box'>
      {messages.map((message, index) => (
        <MessageBubble key={index} text={message.text} sender={message.sender} />
        ))}
    </div>
  )
}

export default ChatBox