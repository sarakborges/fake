// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";
import Link from "next/link";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { getTimeString } from "Helpers/Functions";
import { ROUTES } from "Helpers/routes";

// Atoms
import Text from "Components/Atoms/Text";
import Avatar from "Components/Atoms/Avatar";
import Button from "Components/Atoms/Button";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";
import NoNotification from "Components/Molecules/NoNotification";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

// Template
const NotificationsTemplate = () => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const { userState, userDispatch } = useContext(UserContext);
  const { profile, user } = userState;

  const { appDispatch } = useContext(AppContext);

  const displayToast = (toast) => {
    const toasts = {
      acceptConnectionSuccess: {
        title: "Successo",
        text: `Conexão aceita!`,
        type: "success",
      },

      acceptConnectionError: {
        title: "Erro",
        text: `Aconteceu algum erro ao tentar aceitar a conexão. Tente novamente.`,
        type: "error",
      },

      refuseConnectionSuccess: {
        title: "Successo",
        text: `Conexão recusada.`,
        type: "success",
      },

      refuseConnectionError: {
        title: "Erro",
        text: `Aconteceu algum erro ao tentar recusar a conexão. Tente novamente.`,
        type: "error",
      },
    };

    appDispatch({
      type: "SET_TOAST",
      data: {
        ...toasts[toast],
        isVisible: true,
      },
    });

    setTimeout(() => {
      appDispatch({
        type: "TOGGLE_TOAST",
        data: false,
      });
    }, 5000);
  };

  const getProfile = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const profileReq = await ProfileAPI.getProfileById(profile._id);

    if (profileReq) {
      setProfileData(profileReq);
    }
  }, [profile, ProfileAPI]);

  const updateLocalUser = (newProfile) => {
    userDispatch({
      type: "SET_USER",
      data: {
        user: {
          ...user,

          profiles: [
            ...user.profiles.map((item) => {
              if (item._id === profile._id) {
                return { ...newProfile };
              } else {
                return item;
              }
            }),
          ],
        },

        profile: { ...newProfile },
      },
    });
  };

  const getPendingConnections = () => {
    return (
      profileData?.connections?.filter?.((item) => {
        if (item.status === "pending") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  };

  const updateUsers = (req) => {
    const newLocalUser = req.find((item) => item._id === profile._id);

    updateLocalUser({ ...newLocalUser });
  };

  const acceptConnection = async (target) => {
    try {
      setIsRequesting(true);

      const updatedProfiles = await ProfileAPI.updateConnection({
        ids: [target, profile._id],
        status: "accept",
      });

      updateUsers([...updatedProfiles]);

      displayToast("acceptConnectionSuccess");
      setIsRequesting(false);
    } catch (e) {
      displayToast("acceptConnectionError");
      setIsRequesting(false);
      console.log(e);
    }
  };

  const refuseConnection = async (target) => {
    try {
      setIsRequesting(true);

      const updatedProfiles = await ProfileAPI.updateConnection({
        ids: [profile._id, target],
        status: "remove",
      });

      updateUsers([...updatedProfiles]);

      displayToast("refuseConnectionSuccess");
      setIsRequesting(false);
    } catch (e) {
      displayToast("refuseConnectionError");
      setIsRequesting(false);
      console.log(e);
    }
  };

  useEffect(() => {
    getProfile();
  }, [profile, getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Notificações</title>
      </Head>

      {!profileData?._id && <NoProfile />}

      {profileData?._id && (
        <S.NotificationsWrapper>
          {getPendingConnections()?.length < 1 && (
            <S.NoNotificationsWrapper>
              <NoNotification />
            </S.NoNotificationsWrapper>
          )}

          {getPendingConnections()?.length > 0 && (
            <>
              <Text type='pagetitle'>
                {`Você possui ${getPendingConnections()?.length} ${
                  getPendingConnections()?.length !== 1
                    ? "solicitações"
                    : "solicitação"
                } de conexão:`}
              </Text>

              <S.NotificationsList>
                {getPendingConnections().map((item, key) => {
                  return (
                    <S.NotificationsItem key={`notification-${key}`}>
                      <Link href={ROUTES.PROFILE.replace(":id", item.user.url)}>
                        <a>
                          <Avatar
                            img={item.user.avatar}
                            size={48}
                            bgColor='main'
                          />
                        </a>
                      </Link>

                      <S.NotificationText>
                        <Text>
                          <Link
                            href={ROUTES.PROFILE.replace(":id", item.user.url)}
                          >
                            <a>{item.user.name}</a>
                          </Link>{" "}
                          enviou uma solicitação de conexão.
                        </Text>

                        <Text pt={4}>{getTimeString(item.connectedAt)}</Text>
                      </S.NotificationText>

                      <S.NotificationActions>
                        <Button
                          style='success-secondary'
                          size={16}
                          onClick={() => acceptConnection(item.user._id)}
                          disabled={isRequesting}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                          Aceitar
                        </Button>

                        <Button
                          style='warning-secondary'
                          size={16}
                          onClick={() => refuseConnection(item.user._id)}
                          disabled={isRequesting}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} />
                          Recusar
                        </Button>
                      </S.NotificationActions>
                    </S.NotificationsItem>
                  );
                })}
              </S.NotificationsList>
            </>
          )}
        </S.NotificationsWrapper>
      )}
    </AuthedTemplate>
  );
};

export default NotificationsTemplate;
