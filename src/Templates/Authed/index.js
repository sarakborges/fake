// Dependencies
import React, { useCallback, useContext, useEffect } from "react";

// APIs
import UserAPI from "Apis/User";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Components
import TopBar from "Components/Template/TopBar";

// Style
import * as s from "./style";
import { ThemeProvider } from "styled-components";

// Template
const AuthedTemplate = ({ children }) => {
  const { userDispatch } = useContext(UserContext);
  const { appState } = useContext(AppContext);

  const { theme } = appState;

  const getUser = useCallback(() => {
    const userData = UserAPI.getUser(0);

    userDispatch({
      type: "SET_USER",
      data: {
        isLoggedIn: true,
        user: userData,
      },
    });
  }, [UserAPI, userDispatch]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <ThemeProvider theme={theme}>
      <s.GlobalStyles />

      <s.Container>
        <TopBar />

        <s.Content>{children}</s.Content>
      </s.Container>
    </ThemeProvider>
  );
};

export default AuthedTemplate;
