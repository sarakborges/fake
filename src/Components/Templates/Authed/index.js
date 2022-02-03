// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { getUserData, getAppData } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Atoms
import Button from "Components/Atoms/Button";

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

  const [displaySidebar, setDisplaySidebar] = useState(false);

  const setUserData = useCallback(async () => {
    try {
      const userReq = await getUserData();

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
    const appData = getAppData(appState.theme.slug);

    appDispatch({
      type: "SET_THEME",
      data: {
        ...appData.theme,
      },
    });

    appDispatch({
      type: "SET_DISPLAY_ADULT",
      data: appData.displayAdult,
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

      <S.Topbar>
        <Button
          style='transparent'
          onClick={() => setDisplaySidebar(!displaySidebar)}
          size={20}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </S.Topbar>

      <S.Container>
        <Sidebar displaySidebar={displaySidebar} />

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
