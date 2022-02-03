// Dependencies
import { useReducer, createContext } from "react";

// Reducers
import { AppReducer } from "Reducers/App";

// Style
import DarkTheme from "Styles/Themes/Dark";

export const AppContext = createContext();

const INITIAL_STATE = {
  theme: DarkTheme,

  displayAdult: false,

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
