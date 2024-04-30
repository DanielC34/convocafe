import React from "react";
import "./Navbar.css";
import { signout } from "../../auth";
// import Button from "@mui/material/Button";
import Logout from "../../pages/img/Logout.png";
import Option from "../../pages/img/Option.png";
import { useChatContext } from "../ChatContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); //Initialize navigation
  const { selectedChat } = useChatContext(); //Access selected name

  const onSignout = () => {
    signout(); //Perform signout action
    console.log("User signed out");
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-text">{selectedChat || "ConvoCafe"}</span>
      </div>
      <div className="nav-links">
        <img
          src={Option}
          alt="Option"
          style={{ width: "30px", cursor: "pointer", marginRight: "20px" }}
        />
        <img
          src={Logout}
          alt="Logout"
          style={{ width: "30px", cursor: "pointer" }}
          onClick={onSignout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
