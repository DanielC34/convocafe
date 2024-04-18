import React from 'react'
import './ChatList.css'

const ChatList = () => {

    const chats = [
      { id: 1, name: "Johnny Cage", lastMessage: "Hey man!!", unreadCount: 2 },
      {
        id: 2,
        name: "Coraline Mathers",
        lastMessage: "Lobos wassup!!",
        unreadCount: 0,
      },
      {
        id: 3,
        name: "Alicia Merven",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
      {
        id: 4,
        name: "Chris Cringle",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
      {
        id: 5,
        name: "Alicia Merven",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
      {
        id: 6,
        name: "Alicia Merven",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
      {
        id: 7,
        name: "Alicia Merven",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
      {
        id: 8,
        name: "Alicia Merven",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
      {
        id: 9,
        name: "Alicia Merven",
        lastMessage: "Hey man!!",
        unreadCount: 1,
      },
    ];


    return (
        <div className='chats-list'>
            <h2>Messages</h2>
            <ul className="chat-list">
                {chats.map(chat => (
                    <li key={chat.id} className={chat.unreadCount > 0 ? 'unread' : ''}>
                        <div className='chat-info'>
                            <h3>{chat.name}</h3>
                            <p>{chat.lastMessage}</p>
                        </div>
                        {chat.unreadCount > 0 && <span className='unread-count'>{chat.unreadCount}</span>}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;