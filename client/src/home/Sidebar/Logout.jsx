import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BsBoxArrowLeft } from "react-icons/bs";
import { useAuth } from "../../context/AuthProvider.jsx";
import axios from "axios";
import Icon from "../../assets/icon.png";
import Cookies from "js-cookie";
import toast from "react-hot-toast";


const Logout = () => {
  const [loading, setLoading] = useState(false); //State to manage loading status during logout
  const [authUser] = useAuth(); //Get the authenticated user details from context

  //Function to handle user logout 
  const handleLogout = async () => {
    setLoading(true); //Set loading to true when logout process starts

    try {
      //Make an API call to logout the user from application
      const res = await axios.post("/api/user/logout");
      
      localStorage.removeItem("ChatApp"); //Remove user data from local storage
      
      Cookies.remove("jwt"); //Remove jwt cookie
      
      setLoading(false); //Set loading to false once user is logged out
      
      toast.success("Logged out successfully"); //Display successful logout message
      window.location.reload(); //Reload the window to update the UI

    } catch (error) {
      console.log("Error in Logout", error); //Log any errors to the console
      toast.error("Error in logging out"); //Display error message 
    }
  };
  return (
    <>
      <div className="border border-white p-1 rounded-lg bg-gray-700 items-center">
        <div className="flex">
          <div className="w-8 h-8 rounded-full overflow-hidden mr-0">
            <img src={Icon} alt="User Icon" />
          </div>
          <div className="ml-4">
            <p className="mb-2 font-bold">{authUser.user.fullname}</p>
            <p className="mb-2 text-sm">{authUser.user.email}</p>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      <div className=" h-[10vh] bg-transparent">
        <div>
          <BsBoxArrowLeft
            className="text-5xl text-white hover:bg-slate-700 duration-300 cursor-pointer rounded-full p-2 ml-2 mt-1"
            onClick={handleLogout} //Call handleLogout function when logout button is clicked
          />
        </div>
      </div>
    </>
  );
}

export default Logout;
