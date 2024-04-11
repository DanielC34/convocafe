import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Login from "./components/LogInPage/Login";
import Signup from "./components/SignUpPage/SignUp";
import ChatPage from "./components/ChatPage/ChatPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/chats" element={<ChatPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
