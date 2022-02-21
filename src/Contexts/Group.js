// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { GroupReducer } from "Reducers/Group";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupState, groupDispatch] = useReducer(GroupReducer, undefined);

  return (
    <GroupContext.Provider value={{ groupState, groupDispatch }}>
      {children}
    </GroupContext.Provider>
  );
};
