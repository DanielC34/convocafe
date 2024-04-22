import React from "react";
import "./ChatList.css";
import ProfilePic from '../../pages/img/ProfilePic.png'

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
    <div className="chats-list">
      <ul className="chat-list">
        {chats.map((chat) => (
          <li key={chat.id} className={chat.unreadCount > 0 ? "unread" : ""}>
            {/* Profile Picture */}
            <div className="profile-picture">
              <img src={ProfilePic} alt="ProfPic" />
            </div>
            {/* Chat Info */}
            <div className="chat-info">
              <h3>{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
            {/* Unread Count */}
            {chat.unreadCount > 0 && (
              <span className="unread-count">{chat.unreadCount}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
