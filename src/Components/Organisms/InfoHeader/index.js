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

  const displayToast = (toast) => {
    const toasts = {
      connectSuccess: {
        title: "Successo",
        text: "Conexão solicitada",
        type: "success",
      },

      connectError: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar solicitar conexão. Tente novamente.`,
        type: "error",
      },

      removeConnectionSuccess: {
        title: "Sucesso!",
        text: `Conexão removida.`,
        type: "success",
      },

      removeConnectionError: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar remover a conexão. Tente novamente.`,
        type: "error",
      },

      blockSuccess: {
        title: "Sucesso!",
        text: `Perfil bloqueado.`,
        type: "success",
      },

      blockError: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar bloquear o perfil. Tente novamente.`,
        type: "error",
      },

      unblockSuccess: {
        title: "Sucesso!",
        text: `Perfil desbloqueado.`,
        type: "success",
      },

      unblockError: {
        title: "Erro!",
        text: `Aconteceu algum erro ao tentar desbloquear o perfil. Tente novamente.`,
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
        displayToast("connectError");
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
        displayToast("connectError");
        setIsRequesting(false);
        return;
      }

      setInfo(newInfo);
      updateLocalUser({ ...newProfile });

      setIsRequesting(false);
      displayToast("connectSuccess");
    },

    removeConnection: async () => {
      setIsRequesting(true);

      const deleteConnectionReq = await ProfileAPI.deleteConnection({
        ids: [profile._id, info._id],
      });

      if (deleteConnectionReq?.error) {
        displayToast("removeConnectionError");
        setIsRequesting(false);
      }

      updateLocalUser({
        ...profile,
        connections: profile?.connections?.filter?.(
          (item) => item.user._id !== info._id
        ),
      });

      setInfo({
        ...info,
        connections: info?.connections?.filter?.(
          (item) => item.user._id !== profile._id
        ),
      });

      displayToast("removeConnectionSuccess");
      setIsRequesting(false);
    },

    blockUser: async () => {
      setIsRequesting(true);

      const newBlocked = {
        _id: info._id,
        avatar: info.avatar,
        name: info.name,
        url: info.url,
      };

      const newProfile = {
        ...profile,

        blockedUsers:
          profile?.blockedUsers?.length > 0
            ? [...profile.blockedUsers, { ...newBlocked }]
            : [{ ...newBlocked }],
      };

      const updateCurrentUserReq = await ProfileAPI.updateProfile({
        ...newProfile,
      });

      if (!updateCurrentUserReq) {
        displayToast("blockError");
        setIsRequesting(false);
        return;
      }

      updateLocalUser({ ...newProfile });

      setIsRequesting(false);
      displayToast("blockSuccess");
    },

    unBlockUser: async () => {
      setIsRequesting(true);

      const newProfile = {
        ...profile,

        blockedUsers:
          profile?.blockedUsers?.length > 0
            ? [...profile.blockedUsers.filter((item) => item._id !== info._id)]
            : [],
      };

      const updateCurrentUserReq = await ProfileAPI.updateProfile({
        ...newProfile,
      });

      if (!updateCurrentUserReq) {
        displayToast("unblockError");
        setIsRequesting(false);
        return;
      }

      updateLocalUser({ ...newProfile });

      setIsRequesting(false);
      displayToast("unblockSuccess");
    },
  };

  const getCodition = (condition) => {
    const isSelf = profile._id === info._id;
    const isOwner = profile._id === info.owner;

    const conditions = {
      isOwner: isOwner,
      isNotOwner: !isOwner,

      hasAnyConnectionStatus:
        isSelf ||
        info.connections?.find?.((item) => item.user._id === profile._id),

      isNotConnected:
        isSelf ||
        !info.connections?.find?.(
          (item) => item.status === "connected" && item.user._id === profile._id
        ),

      isNotPending:
        isSelf ||
        !info.connections?.find?.(
          (item) => item.status === "pending" && item.user._id === profile._id
        ),

      isNotSent:
        isSelf ||
        !info.connections?.find?.(
          (item) => item.status === "sent" && item.user._id === profile._id
        ),

      isNotMember:
        isOwner || !info.members?.find?.((item) => item._id === profile._id),

      isMember:
        isOwner || info.members?.find?.((item) => item._id === profile._id),

      isNotBlocked:
        isSelf ||
        !profile.blockedUsers?.find?.((item) => item?._id === info._id),

      isBlocked:
        isSelf ||
        profile.blockedUsers?.find?.((item) => item?._id === info._id),
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
