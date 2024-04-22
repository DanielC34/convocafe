import React from 'react';
import './Sidebar.css'
import ChatList from '../ChatList/ChatList';
import Searchbar from '../../components/SearchBar/SearchBar';

const Sidebar = () => {
  //Define a function to handle search functionality
    const handleSearch = (searchText) => {
      //implement search logic here
    console.log("Search Text:", searchText);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="sidebar-chats">
        {/*Function to render list of chats and contacts */}
        {/* Each chat or contact item should be separate comment */}
        <ChatList />
      </div>
    </div>
  );
}

export default Sidebar;