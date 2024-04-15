import React from 'react';
import './Sidebar.css'
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
        <h2>Chats</h2>
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="sidebar-chats">
        {/*Function to render list of chats and contacts */}
        {/* Each chat or contact item should be separate comment */}
      </div>
    </div>
  );
}

export default Sidebar;