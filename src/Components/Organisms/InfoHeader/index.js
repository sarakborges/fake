// Dependencies
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// APIs
import ProfileAPI from "Apis/Profile";
import GroupAPI from "Apis/Group";

// Helpers
import { ROUTES } from "Helpers/routes";
import {
  PROFILE_HEADER,
  GROUP_HEADER,
  TOASTS,
  TOAST_TYPES,
} from "Helpers/Constants";

// Contexsts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import InfoLinks from "Components/Atoms/InfoLinks";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";
import TagsList from "Components/Molecules/TagsList";
import ConnectButton from "Components/Molecules/ConnectButton";
import UnconnectButton from "Components/Molecules/UnconnectButton";
import BlockProfileButton from "Components/Molecules/BlockProfileButton";
import UnblockProfileButton from "Components/Molecules/UnblockProfileButton";

// Style
import * as S from "./style";

const InfoHeader = ({ info, type, setInfo }) => {
  const [tags, setTags] = useState([]);

  const headerType = type === "group" ? GROUP_HEADER : PROFILE_HEADER;

  const { userState, userDispatch } = useContext(UserContext);

  const { appState, appDispatch } = useContext(AppContext);
  const { isRequesting } = appState;

  const { user, profile } = userState;
  const { displayAdult } = appState;

  const updateLocalUser = (newProfile) => {
    userDispatch({
      type: "SET_USER",
      data: {
        user: {
          ...user,

          profiles: [
            ...user.profiles.map((item) =>
              item._id === profile._id ? { ...newProfile } : item
            ),
          ],
        },

        profile: { ...newProfile },
      },
    });
  };

  const updateUsers = (req) => {
    const newLocalUser = req.find((item) => item._id === profile._id);
    const newInfo = req.find((item) => item._id === info._id);

    updateLocalUser({ ...newLocalUser });
    setInfo({ ...newInfo });
  };

  const updateConnection = async (status) => {
    try {
      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      const updateConnectinoReq = await ProfileAPI.updateConnection({
        ids: [profile._id, info._id],
        status: status,
      });

      updateUsers(updateConnectinoReq);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });
    } catch (e) {
      console.log(e);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });
    }
  };

  const headerButtons = {
    connectTo: <ConnectButton />,
    cancelConnection: <UnconnectButton>Cancelar solicitação</UnconnectButton>,
    removeConnection: <UnconnectButton>Remover conexão</UnconnectButton>,
    blockProfile: <BlockProfileButton />,
    unBlockProfile: <UnblockProfileButton />,
  };

  const buttonActions = {
    enterGroup: async () => {
      try {
        appDispatch({
          type: "SET_IS_REQUESTING",
          data: true,
        });

        const joinReq = await GroupAPI.joinGroup({
          profile: profile._id,
          group: info._id,
        });

        updateLocalUser({
          ...profile,

          groups:
            profile?.groups?.length > 0
              ? [...profile.groups, { ...joinReq.profile }]
              : [{ ...joinReq.profile }],
        });

        setInfo({ ...joinReq.group });

        appDispatch({
          type: "SET_IS_REQUESTING",
          data: false,
        });

        appDispatch({
          type: "SET_TOAST",
          data: {
            ...TOAST_TYPES.success,
            text: TOASTS.JOIN_GROUP.success,
            isVisible: true,
          },
        });
      } catch (e) {
        console.log(e);

        appDispatch({
          type: "SET_TOAST",
          data: {
            ...TOAST_TYPES.error,
            text: TOASTS.JOIN_GROUP.error,
            isVisible: true,
          },
        });

        appDispatch({
          type: "SET_IS_REQUESTING",
          data: false,
        });
      }
    },

    leaveGroup: async () => {
      try {
        appDispatch({
          type: "SET_IS_REQUESTING",
          data: true,
        });

        const leaveReq = await GroupAPI.leaveGroup({
          profile: profile._id,
          group: info._id,
        });

        updateLocalUser({
          ...profile,

          groups:
            profile?.groups?.length > 0
              ? [...profile.groups.filter((item) => item !== info._id)]
              : [],
        });

        setInfo({ ...leaveReq });

        appDispatch({
          type: "SET_IS_REQUESTING",
          data: false,
        });

        appDispatch({
          type: "SET_TOAST",
          data: {
            ...TOAST_TYPES.success,
            text: TOASTS.LEAVE_GROUP.success,
            isVisible: true,
          },
        });
      } catch (e) {
        console.log(e);

        appDispatch({
          type: "SET_TOAST",
          data: {
            ...TOAST_TYPES.error,
            text: TOASTS.LEAVE_GROUP.error,
            isVisible: true,
          },
        });

        appDispatch({
          type: "SET_IS_REQUESTING",
          data: false,
        });
      }
    },
  };

  const getCondition = (condition) => {
    if (!profile) {
      return false;
    }

    const isSelf = profile._id === info._id;
    const isOwner = profile._id === info.owner;
    const isBlocked = profile.blockedUsers?.find?.((item) => item === info._id);

    const conditions = {
      isOwner: isOwner,
      isNotOwner: !isOwner,

      isSelf: isSelf,
      isNotSelf: !isSelf,

      hasAnyConnectionStatus:
        isSelf ||
        isBlocked ||
        info.connections?.find?.((item) => item.user._id === profile._id),

      isNotConnected:
        isSelf ||
        isBlocked ||
        !info.connections?.find?.(
          (item) => item.status === "connected" && item.user._id === profile._id
        ),

      isNotPending:
        isSelf ||
        isBlocked ||
        !info.connections?.find?.(
          (item) => item.status === "pending" && item.user._id === profile._id
        ),

      isNotSent:
        isSelf ||
        isBlocked ||
        !info.connections?.find?.(
          (item) => item.status === "sent" && item.user._id === profile._id
        ),

      isNotMember:
        isOwner ||
        !info.members?.find?.((item) => item.profile._id === profile._id),

      isMember:
        isOwner ||
        info.members?.find?.((item) => item.profile._id === profile._id),

      isNotBlocked: isSelf || !isBlocked,

      isBlocked: isSelf || isBlocked,
    };

    return conditions[condition];
  };

  useEffect(() => {
    let newTags = [];

    if (info?.publicTags) {
      newTags = [...newTags, ...info?.publicTags];
    }

    newTags.sort((a, b) => (a > b ? 1 : -1));

    setTags(newTags);
  }, [info]);

  return (
    <>
      {!getCondition("isNotSent") && (
        <S.PendingAction>
          <S.PendingText>
            <b>Ação pendente:</b>
            <> Deseja conectar-se a </>
            <b>{info?.name}</b>
            <>?</>
          </S.PendingText>

          <S.PendingButtons>
            <Button
              style='success-secondary'
              size={16}
              disabled={isRequesting}
              onClick={buttonActions.acceptConnection}
            >
              <FontAwesomeIcon icon={faCheckCircle} />
              Aceitar
            </Button>

            <Button
              style='warning-secondary'
              size={16}
              disabled={isRequesting}
              onClick={buttonActions.removeConnection}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
              Recusar
            </Button>
          </S.PendingButtons>
        </S.PendingAction>
      )}

      <S.Head>
        <S.Info>
          <S.InfoArea>
            <InfoArea info={info} side='left' />
          </S.InfoArea>

          <S.Center>
            <InfoLinks info={info} type={type} />
          </S.Center>

          {profile?._id && (
            <S.Actions>
              {headerType.ACTIONS.filter(
                (item) => !getCondition(item.hideCondition)
              ).map((item) => {
                return <div key={item.id}>{headerButtons[item.action]}</div>;
              })}

              {!getCondition("isNotSelf") && (
                <S.EditLink>
                  <Link href={ROUTES.SETTINGS.PROFILE}>
                    <a>Editar perfil</a>
                  </Link>
                </S.EditLink>
              )}

              {!getCondition("isNotOwner") && (
                <S.EditLink>
                  <Link href={ROUTES.SETTINGS.GROUP.replace(":id", info.url)}>
                    <a>Editar grupo</a>
                  </Link>
                </S.EditLink>
              )}
            </S.Actions>
          )}
        </S.Info>

        {tags?.length > 0 && (
          <TagsList
            tags={tags}
            hasLink
            compareTo={[
              ...(profile?.publicTags || []),
              ...(profile?.privateTags || []),
            ]}
          />
        )}
      </S.Head>
    </>
  );
};

export default InfoHeader;
