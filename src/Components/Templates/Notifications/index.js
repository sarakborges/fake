// Dependencies
import { useContext, useState } from "react";
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

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

// Template
const NotificationsTemplate = () => {
  const [isRequesting, setIsRequesting] = useState(false);

  const { userState, userDispatch } = useContext(UserContext);
  const { profile, user } = userState;

  const { appDispatch } = useContext(AppContext);

  const displayAcceptSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: `Conexão aceita!`,
        type: "success",
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

  const displayAcceptErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar aceitar a conexão. Tente novamente.`,
        type: "error",
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

  const displayRefuseSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: `Conexão recusada.`,
        type: "success",
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

  const displayRefuseErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar recusar a conexão. Tente novamente.`,
        type: "error",
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

  const getPendingConnections = () => {
    return (
      profile?.connections
        ?.filter?.((item) => {
          if (item.status === "pending") {
            return item;
          } else {
            return false;
          }
        })
        .map((item) => {
          return { connectionRequest: { ...item } };
        }) || []
    );
  };

  const acceptConnection = async (target) => {
    setIsRequesting(true);

    const newProfile = {
      ...profile,
      connections: profile?.connections?.map?.((item) => {
        if (item.user._id === target) {
          return { ...item, status: "connected" };
        } else {
          return item;
        }
      }),
    };

    const profileReq = await ProfileAPI.updateProfile({ ...newProfile });

    if (!profileReq) {
      displayAcceptErrorToast();
      setIsRequesting(false);
    }

    const targetReq = await ProfileAPI.acceptConnection({
      _id: target,
      connectionId: profile._id,
    });

    if (!targetReq) {
      displayAcceptErrorToast();
      setIsRequesting(false);
    }

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

    displayAcceptSuccessToast();
    setIsRequesting(false);
  };

  const refuseConnection = async (target) => {
    setIsRequesting(true);

    const newProfile = {
      ...profile,
      connections: profile?.connections?.filter?.(
        (item) => item.user._id !== target
      ),
    };

    const profileReq = await ProfileAPI.updateProfile({ ...newProfile });

    if (!profileReq) {
      displayRefuseErrorToast();
      setIsRequesting(false);
    }

    const targetReq = await ProfileAPI.deleteConnection({
      _id: target,
      connectionId: profile._id,
    });

    if (!targetReq) {
      displayRefuseErrorToast();
      setIsRequesting(false);
    }

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

    displayRefuseSuccessToast();
    setIsRequesting(false);
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Notificações</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profile?._id && (
        <S.NotificationsWrapper>
          {getPendingConnections()?.length < 1 && (
            <>
              <Text type='pagetitle'>Suas notificações</Text>
              <Text pt={16}>Tudo certinho por aqui! Sem notificações.</Text>
            </>
          )}

          {getPendingConnections()?.length > 0 && (
            <>
              <Text type='pagetitle'>
                {`Você possui ${getPendingConnections()?.length} ${
                  getPendingConnections()?.length !== 1
                    ? "solicitações"
                    : "solicitação"
                } de conexão`}
              </Text>

              <S.NotificationsList>
                {getPendingConnections().map((item, key) => {
                  return (
                    <S.NotificationsItem key={`notification-${key}`}>
                      <Link
                        href={ROUTES.PROFILE.replace(
                          ":id",
                          item.connectionRequest.user.url
                        )}
                      >
                        <a>
                          <Avatar
                            img={item.connectionRequest.user.avatar}
                            size={48}
                            bgColor='main'
                          />
                        </a>
                      </Link>

                      <S.NotificationText>
                        <Text>
                          <Link
                            href={ROUTES.PROFILE.replace(
                              ":id",
                              item.connectionRequest.user.url
                            )}
                          >
                            <a>{item.connectionRequest.user.name}</a>
                          </Link>{" "}
                          enviou uma solicitação de conexão.
                        </Text>

                        <Text pt={4}>
                          {getTimeString(item.connectionRequest.connectedAt)}
                        </Text>
                      </S.NotificationText>

                      <S.NotificationActions>
                        <Button
                          style='success-secondary'
                          size={16}
                          onClick={() =>
                            acceptConnection(item.connectionRequest.user._id)
                          }
                          disabled={isRequesting}
                        >
                          <FontAwesomeIcon icon={faCheckCircle} />
                          Aceitar
                        </Button>

                        <Button
                          style='warning-secondary'
                          size={16}
                          onClick={() =>
                            refuseConnection(item.connectionRequest.user._id)
                          }
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
