import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

//Create a context for authentication
export const AuthContext = createContext();

//AuthProvider component to provide authentication for its children
export const AuthProvider = ({ children }) => {

  //Initial state for authenticated user, getting cookies from local storage
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("ChatApp");

  // Parse the user data and store it in state.
  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );
  return (
    //Provide the authUser and setAuthUser to the children components
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
