// Dependencies
import { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";

// Helpers
import { getUserData, getAppData } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Organisms
import Topbar from "Components/Organisms/Topbar";

// Templates
import AppTemplate from "Components/Templates/App";

// Style
import * as S from "./style";

// Template
const AuthedTemplate = ({ children }) => {
  const router = useRouter();

  const { appDispatch } = useContext(AppContext);
  const { userDispatch } = useContext(UserContext);

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
    const { displayAdult } = getAppData();

    appDispatch({
      type: "SET_DISPLAY_ADULT",
      data: displayAdult,
    });
  }, [appDispatch]);

  useEffect(() => {
    setUserData();
    setAppData();
  }, [setUserData, setAppData, getUserData, getAppData]);

  return (
    <AppTemplate>
      <S.Container>
        <Topbar />

        <S.Content>{children}</S.Content>
      </S.Container>
    </AppTemplate>
  );
};

export default AuthedTemplate;
