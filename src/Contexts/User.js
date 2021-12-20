// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { UserReducer } from "Reducers/User";

export const UserContext = createContext();

const INITIAL_STATE = {
  isLoggedIn: false,

  user: {
    id: 0,
    email: "",
    password: "",
    activeProfile: undefined,
    profiles: undefined,

    profile: {
      id: 0,
      name: "",
      url: "",
      avatar: "",
      isAdult: false,
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
