// Dependencies
import { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";

// Helpers
import { getUserData, getAppData } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Molecules
import Toast from "Components/Molecules/Toast";

// Organisms
import Sidebar from "Components/Organisms/Sidebar";

// Style
import { GlobalStyle } from "Styles/global";
import * as S from "./style";

// Template
const AuthedTemplate = ({ children }) => {
  const router = useRouter();

  const { appState, appDispatch } = useContext(AppContext);
  const { userDispatch } = useContext(UserContext);

  const { theme, toast } = appState;

  const setUserData = useCallback(() => {
    try {
      const userReq = getUserData();

      if (!userReq?.user) {
        router.push(ROUTES.LOGIN);
        return;
      }

      userDispatch({
        type: "SET_USER",
        data: { ...userReq },
      });
    } catch (e) {
      console.log(e);
    }
  }, [getUserData, userDispatch]);

  const setAppData = useCallback(async () => {
    appDispatch({
      type: "SET_THEME",
      data: { ...getAppData({ ...appState }) },
    });
  }, [appDispatch]);

  useEffect(() => {
    setUserData();
    setAppData();
  }, [setUserData, setAppData, getUserData, getAppData]);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      {<Toast {...toast} />}

      <S.Container>
        <Sidebar />

        <S.Content>
          <S.PageContentWrapper>
            <S.PageContent>{children}</S.PageContent>
          </S.PageContentWrapper>
        </S.Content>
      </S.Container>
    </ThemeProvider>
  );
};

export default AuthedTemplate;
