// Dependencies
import React, { useReducer, createContext } from "react";

// Reducers
import { AppReducer } from "Reducers/App";

// Components
import AlertBar from "Components/Template/AlertBar";

// Style
import DarkTheme from "Styles/Themes/Dark";

export const AppContext = createContext();

const INITIAL_STATE = {
  toast: {
    display: false,
    message: "",
    type: "success",
  },

  topBar: {
    display: false,
  },

  theme: DarkTheme,
};

export const AppProvider = ({ children }) => {
  const [appState, appDispatch] = useReducer(AppReducer, INITIAL_STATE);
  const { toast } = appState;

  const toggleToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        ...toast,
        display: !toast.display,
      },
    });
  };

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {toast.display && (
        <AlertBar type={toast.type} onCloseClick={toggleToast}>
          {toast.message}
        </AlertBar>
      )}

      {children}
    </AppContext.Provider>
  );
};
