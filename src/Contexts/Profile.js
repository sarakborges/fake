// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { ProfileReducer } from "Reducers/Profile";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profileState, profileDispatch] = useReducer(ProfileReducer, undefined);

  return (
    <ProfileContext.Provider value={{ profileState, profileDispatch }}>
      {children}
    </ProfileContext.Provider>
  );
};
