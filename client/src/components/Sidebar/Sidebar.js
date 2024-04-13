import React from 'react';
import './Sidebar.css'

const Sidebar = () => {
  return (
      <div className='sidebar'>
          <div className='sidebar-header'>
              <h2>Chats</h2>
          </div>
          <div className='sidebar-chats'>
              { /*Function to render list of chats and contacts */}
              { /* Each chat or contact item should be separate comment */}
          </div>
      </div>
  )
}

export default Sidebar;