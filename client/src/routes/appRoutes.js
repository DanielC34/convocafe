import React from 'react';
import { BrowserRouter, Router, Route } from "react-router-dom";
import LandingPage from '../pages/LandingPage/LandingPage'
import LogInPage from "../pages/LoginPage/LogInPage.js";
import Signup from '../pages/SignUpPage/SignUp'
import ChatPage from '../pages/ChatPage/ChatPage'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Router>
                <Route exact path="/" Component={LandingPage} />
                <Route exact path="/login" Component={LogInPage} />
                <Route exact path="/signup" Component={Signup} />
                <Route exact path="/chat" Component={ChatPage} />
            </Router>
        </BrowserRouter>
    );
};

export default AppRoutes;