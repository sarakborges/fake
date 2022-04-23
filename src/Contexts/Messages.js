// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { MessagesReducer } from "Reducers/Messages";

export const MessagesContext = createContext();

const INITIAL_STATE = {
  chatUsers: undefined,
  messages: undefined,
};

export const MessagesProvider = ({ children }) => {
  const [messagesState, messagesDispatch] = useReducer(
    MessagesReducer,
    INITIAL_STATE
  );

  return (
    <MessagesContext.Provider value={{ messagesState, messagesDispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
