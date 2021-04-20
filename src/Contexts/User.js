// Dependencies
import React, { useReducer, createContext } from "react";

// Reducers
import { UserReducer } from "Reducers/User";

export const UserContext = createContext();

const INITIAL_STATE = {
  isLoggedIn: false,

  user: {
    id: 0,
    name: "",
    avatar: "",
  },
};

export const UserProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(UserReducer, INITIAL_STATE);

  return (
    <UserContext.Provider value={{ userState, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};
