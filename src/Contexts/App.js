// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { AppReducer } from "Reducers/App";

export const AppContext = createContext();

const INITIAL_STATE = {
  theme: undefined,

  displayAdult: false,
  isRequesting: false,

  toast: {
    isVisible: false,
    title: "",
    text: "",
    type: "",
  },
};

export const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(AppReducer, INITIAL_STATE);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};
