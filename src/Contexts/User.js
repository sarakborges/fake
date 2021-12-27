// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { UserReducer } from "Reducers/User";

export const UserContext = createContext();

const INITIAL_STATE = {
  isLoggedIn: false,

  user: {
    _id: undefined,
    email: undefined,
    password: undefined,
    activeProfile: undefined,
    profiles: undefined,

    profile: {
      _id: undefined,
      name: undefined,
      url: undefined,
      avatar: undefined,
      isAdult: undefined,
    },
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
