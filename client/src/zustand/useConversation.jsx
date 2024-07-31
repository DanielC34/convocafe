import { create } from "zustand";

//Create a Zustand store for managing conversation state
const useConversation = create((set) => ({
  //Initial state: no conversation selected
  selectedConversation: null,

  //Function to set selected conversation
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),

  //Initial state: empty array of messages
  messages: [],

  //Function to set the messages for the selected conversation
  setMessage: (messages) => set({ messages }),
}));

//Export the custom hook for use in other components
export default useConversation;
