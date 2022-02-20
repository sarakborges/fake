// Dependencies
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// APIs
import ProfileAPI from "Apis/Profile";
import GroupAPI from "Apis/Group";

// Helpers
import { ROUTES } from "Helpers/routes";
import { PROFILE_HEADER, GROUP_HEADER, TOASTS } from "Helpers/Constants";
import { displayToast } from "Helpers/Functions";

// Contexsts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import InfoLinks from "Components/Atoms/InfoLinks";

// Style
import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoArea from "Components/Molecules/InfoArea";

const InfoHeader = ({ info, type, setInfo }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);
  const [tags, setTags] = useState([]);

  const dropdownRef = useRef();
  const headerType = type === "group" ? GROUP_HEADER : PROFILE_HEADER;

  const { userState, userDispatch } = useContext(UserContext);
  const { appState, appDispatch } = useContext(AppContext);
  const { user, profile } = userState;
  const { displayAdult } = appState;

  const toggleMenu = () => {
    setDisplayMenu(!displayMenu);
  };

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
      setIsRequesting(true);

      const updateConnectinoReq = await ProfileAPI.updateConnection({
        ids: [profile._id, info._id],
        status: status,
      });

      updateUsers(updateConnectinoReq);

      setIsRequesting(false);
    } catch (e) {
      console.log(e);
      setIsRequesting(false);
    }
  };

  const buttonActions = {
    connectTo: async () => {
      try {
        setIsRequesting(true);

        const createConnectinoReq = await ProfileAPI.createConnection({
          ids: [profile._id, info._id],
        });

        updateUsers(createConnectinoReq);

        setIsRequesting(false);
        displayToast(TOASTS.CONNECT, 0, appDispatch);
      } catch (e) {
        console.log(e);
        setIsRequesting(false);
        displayToast(TOASTS.CONNECT, 1, appDispatch);
      }
    },

    acceptConnection: async () => {
      try {
        await updateConnection("accept");
        displayToast(TOASTS.ACCEPT_CONNECTION, 0, appDispatch);
      } catch (e) {
        console.log(e);
        setIsRequesting(false);
        displayToast(TOASTS.ACCEPT_CONNECTION, 1, appDispatch);
      }
    },

    removeConnection: async () => {
      try {
        await updateConnection("remove");
        displayToast(TOASTS.REMOVE_CONNECTION, 0, appDispatch);
      } catch (e) {
        console.log(e);
        setIsRequesting(false);
        displayToast(TOASTS.REMOVE_CONNECTION, 1, appDispatch);
      }
    },

    blockUser: async () => {
      try {
        setIsRequesting(true);

        const newProfile = {
          ...profile,

          blockedUsers:
            profile?.blockedUsers?.length > 0
              ? [...profile.blockedUsers, info._id]
              : [info._id],
        };

        await ProfileAPI.blockProfile({
          ids: [profile._id, info._id],
          status: "blocked",
        });

        await ProfileAPI.updateConnection({
          ids: [profile._id, info._id],
          status: "remove",
        });

        updateLocalUser({ ...newProfile });

        setIsRequesting(false);
        displayToast(TOASTS.BLOCK, 0, appDispatch);
      } catch (e) {
        setIsRequesting(false);
        displayToast(TOASTS.BLOCK, 1, appDispatch);
        console.log(e);
      }
    },

    unBlockUser: async () => {
      try {
        setIsRequesting(true);

        const newProfile = {
          ...profile,

          blockedUsers:
            profile?.blockedUsers?.length > 0
              ? [...profile.blockedUsers.filter((item) => item !== info._id)]
              : [],
        };

        await ProfileAPI.blockProfile({
          ids: [profile._id, info._id],
          status: "unblocked",
        });

        updateLocalUser({ ...newProfile });

        setIsRequesting(false);
        displayToast(TOASTS.UNBLOCK, 0, appDispatch);
      } catch (e) {
        console.log(e);
        displayToast(TOASTS.UNBLOCK, 0, appDispatch);
        setIsRequesting(false);
      }
    },

    enterGroup: async () => {
      try {
        setIsRequesting(true);

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

        setIsRequesting(false);
        displayToast(TOASTS.JOIN_GROUP, 0, appDispatch);
      } catch (e) {
        console.log(e);
        displayToast(TOASTS.JOIN_GROUP, 1, appDispatch);
        setIsRequesting(false);
      }
    },

    leaveGroup: async () => {
      try {
        setIsRequesting(true);

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

        setIsRequesting(false);
        displayToast(TOASTS.LEAVE_GROUP, 0, appDispatch);
      } catch (e) {
        console.log(e);
        displayToast(TOASTS.LEAVE_GROUP, 1, appDispatch);
        setIsRequesting(false);
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
    document.addEventListener("click", (e) => {
      if (!dropdownRef?.current?.contains(e.target)) {
        setDisplayMenu(false);
      }
    });
  }, []);

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
                return (
                  <div key={item.id}>
                    {item.type === "button" ? (
                      <Button
                        style='primary'
                        size={14}
                        onClick={buttonActions[item.action]}
                        disabled={isRequesting}
                      >
                        {item.title}
                      </Button>
                    ) : (
                      <Link href={item.to.replace(":id", info.url)}>
                        <a>{item.title}</a>
                      </Link>
                    )}
                  </div>
                );
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
          <S.TagsList>
            {tags.map((item) => {
              return (
                <Link key={item} href={ROUTES.SEARCH.replace(":str", item)}>
                  <a>
                    <S.TagItem
                      isCommon={
                        profile?.publicTags?.includes(item) ||
                        profile?.privateTags?.includes(item)
                      }
                    >
                      {item}
                    </S.TagItem>
                  </a>
                </Link>
              );
            })}
          </S.TagsList>
        )}
      </S.Head>
    </>
  );
};

export default InfoHeader;
