// import React from 'react'
// import './Dashboard.css'
// import { isAuthenticated, signout } from '../../backend';
// import { useNavigate } from 'react-router-dom'

// const Dashboard = () => {

//   const navigate = useNavigate(); //Initialized navigation
//   const authenticatedUser = isAuthenticated(); // Check if the user is authenticated

//   //Function to handle signout action
//   const onSignout = () => {
//     signout(); //Performs signout action
//     console.log("User signed out");
//     navigate("/signin");
//   };

//   return !authenticatedUser ? (
//     <h1>Please sign in</h1>
//   ) : (
//     <div className='dashboard'>
//       <button onClick={onSignout}>Sign Out</button>
//       <h1>Hello, {authenticatedUser.user.name}</h1>
//     </div>
//   );
// };

// export default Dashboard;