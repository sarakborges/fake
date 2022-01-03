// Dependencies
import { useContext, useState } from "react";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { GROUP_ACTIONS } from "Helpers/Constants";
import { PROFILE_ACTIONS } from "Helpers/Constants";
import { getTimeString } from "Helpers/Functions";

// Contexsts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const InfoHeader = ({ info, type, setInfo }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user, profile } = userState;

  const [isRequesting, setIsRequesting] = useState(false);

  const displayConnectSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: `Conexão solicitada.`,
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

  const displayConnectErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar solicitar conexão. Tente novamente.`,
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

  const displayRemoveConnectionSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: `Conexão removida.`,
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

  const displayRemoveConnectionErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar remover a conexão. Tente novamente.`,
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

  const displayBlockSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: `Perfil bloqueado.`,
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

  const displayBlockErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar bloquear o perfil. Tente novamente.`,
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

  const displayUnblockSuccessToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Sucesso!",
        text: `Perfil desbloqueado.`,
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

  const displayUnblockErrorToast = () => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar desbloquear o perfil. Tente novamente.`,
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

  const buttonActions = {
    connectTo: async () => {
      const newConnection = {
        user: {
          _id: info._id,
          name: info.name,
          url: info.url,
          avatar: info.avatar,
        },

        status: "sent",
        connectedAt: new Date(),
      };

      setIsRequesting(true);

      const newProfile = {
        ...profile,

        connections:
          profile?.connections?.length > 0
            ? [...profile.connections, { ...newConnection }]
            : [{ ...newConnection }],
      };

      const updateCurrentUserReq = await ProfileAPI.updateProfile({
        ...newProfile,
      });

      if (!updateCurrentUserReq) {
        displayConnectErrorToast();
        setIsRequesting(false);
        return;
      }

      const profileNewConnection = {
        user: {
          _id: profile._id,
          name: profile.name,
          url: profile.url,
          avatar: profile.avatar,
        },

        status: "pending",
        connectedAt: new Date(),
      };

      const newInfo = {
        ...info,

        connections:
          info?.connections?.length > 0
            ? [...info.connections, { ...profileNewConnection }]
            : [{ ...profileNewConnection }],
      };

      const updateProfileReq = await ProfileAPI.updateProfile({ ...newInfo });

      if (!updateProfileReq) {
        displayConnectErrorToast();
        setIsRequesting(false);
        return;
      }

      setInfo(newInfo);

      setIsRequesting(false);

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

      displayConnectSuccessToast();
    },

    removeConnection: async () => {
      setIsRequesting(true);

      const newProfile = {
        ...profile,
        connections: profile?.connections?.filter?.(
          (item) => item.user._id !== info._id
        ),
      };

      const profileReq = await ProfileAPI.updateProfile({ ...newProfile });

      if (!profileReq) {
        displayRemoveConnectionErrorToast();
        setIsRequesting(false);
      }

      const newInfo = {
        ...info,
        connections: info?.connections?.filter?.(
          (item) => item.user._id !== profile._id
        ),
      };

      const targetReq = await ProfileAPI.updateProfile({ ...newInfo });

      if (!targetReq) {
        displayRemoveConnectionErrorToast();
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

      setInfo(newInfo);

      displayRemoveConnectionSuccessToast();
      setIsRequesting(false);
    },

    blockUser: async () => {
      setIsRequesting(true);

      const newProfile = {
        ...profile,

        blockedUsers:
          profile?.blockedUsers?.length > 0
            ? [...profile.blockedUsers, info._id]
            : [info._id],
      };

      const updateCurrentUserReq = await ProfileAPI.updateProfile({
        ...newProfile,
      });

      if (!updateCurrentUserReq) {
        displayBlockErrorToast();
        setIsRequesting(false);
        return;
      }

      setIsRequesting(false);

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

      displayBlockSuccessToast();
    },

    unBlockUser: async () => {
      setIsRequesting(true);

      const newProfile = {
        ...profile,

        blockedUsers:
          profile?.blockedUsers?.length > 0
            ? [...profile.blockedUsers.filter((item) => item !== info._id)]
            : [],
      };

      const updateCurrentUserReq = await ProfileAPI.updateProfile({
        ...newProfile,
      });

      if (!updateCurrentUserReq) {
        displayUnblockErrorToast();
        setIsRequesting(false);
        return;
      }

      setIsRequesting(false);

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

      displayUnblockSuccessToast();
    },
  };

  const getCodition = (condition) => {
    const isSelf = profile._id === info._id;

    const conditions = {
      isOwner: profile._id !== info.owner,
      isNotOwner: profile._id === info.owner,

      isNotConnected:
        isSelf ||
        info.connections?.find?.((item) => item.user._id === profile._id),

      hasAnyConnectionStatus:
        isSelf ||
        !info.connections?.find?.((item) => item.user._id === profile._id),

      isNotBlocked:
        isSelf || !profile.blockedUsers?.find?.((item) => item === info._id),

      isBlocked:
        isSelf || profile.blockedUsers?.find?.((item) => item === info._id),
    };

    return conditions[condition];
  };

  return (
    <>
      <S.InfoHead>
        <S.InfoCover img={info.cover} />

        <S.InfoInfo>
          <S.Avatar>
            {info.avatar ? (
              <Avatar size={128} img={info.avatar} bgColor={"main"} />
            ) : (
              <RoundIcon size={128} icon={faQuestion} bgColor={"main"} />
            )}
          </S.Avatar>

          <div>
            <Text type='custom' fs={36} fw={600}>
              {info.name}
            </Text>

            <Text type='custom' fs={20} fw={400}>
              @{info.url}
            </Text>

            <Text type='custom' pt={16}>
              {`${
                type === "profile" ? "Perfil" : "Grupo"
              } criado em: ${getTimeString(info.createdAt)}`}
            </Text>

            {info?.link && (
              <Text type='custom'>
                <a href={info.link} target='_blank'>
                  {info.link}
                </a>
              </Text>
            )}
          </div>
        </S.InfoInfo>

        <S.InfoActions>
          {(type === "group" ? GROUP_ACTIONS : PROFILE_ACTIONS).map((item) => {
            if (!profile?._id || getCodition(item.hideCondition)) {
              return false;
            }

            return (
              <div key={item.id}>
                <S.ActionTitle>{item.title}</S.ActionTitle>

                {item.type === "button" ? (
                  <Button
                    style='primary'
                    size={16}
                    onClick={buttonActions[item.action]}
                    disabled={isRequesting}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </Button>
                ) : (
                  <Link href={item.to.replace(":id", info.url)}>
                    <a>
                      <FontAwesomeIcon icon={item.icon} />
                    </a>
                  </Link>
                )}
              </div>
            );
          })}
        </S.InfoActions>
      </S.InfoHead>
    </>
  );
};

export default InfoHeader;
