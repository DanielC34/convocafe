import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

//Create a context for socket
const socketContext = createContext();

// Custom hook to use the socket context
export const useSocketContext = () => {
  return useContext(socketContext);
};

//SocketProvider component to provide socket context to its children
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [authUser] = useAuth();

  //useEffect hook to initialize socket connection when the authUser changes
  useEffect(() => {
    if (authUser) {
      //Initialize the socket connection with the server
      const socket = io("http://localhost:4002", {
        query: {
          userId: authUser.user._id,
        },
      });
      setSocket(socket); //Set the socket instance in state

      //Listen for the "getOnlineUsers" event from the user 
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users); //Update online users state 
      });

      //Clean up socket connection when component unmounts or when authUser changes
      return () => socket.close();
    } else {
      //If there is no authenticated user ,close the existing socket connection
      if (socket) {
        socket.close();
        setSocket(null); //Reset the socket state
      }
    }
  }, [authUser]); //Dependency array to run the effect when authUser changes
  return (
    //Provide the socket and onlineUsers state to the children
    <socketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </socketContext.Provider>
  );
};
