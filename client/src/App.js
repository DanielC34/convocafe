import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/LogInPage/Login";
import Signup from "./pages/SignUpPage/SignUp";
import ChatPage from "./pages/ChatPage/ChatPage";

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
