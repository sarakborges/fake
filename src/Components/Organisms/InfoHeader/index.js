// Dependencies
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { faEllipsisH, faQuestion } from "@fortawesome/free-solid-svg-icons";

// APIs
import ProfileAPI from "Apis/Profile";
import GroupAPI from "Apis/Group";

// Helpers
import { PROFILE_HEADER, GROUP_HEADER, TOASTS } from "Helpers/Constants";
import { getTimeString } from "Helpers/Functions";

// Contexsts
import { UserContext } from "Contexts/User";
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";
import InfoLinks from "Components/Atoms/InfoLinks";

// Style
import * as S from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const InfoHeader = ({ info, type, setInfo }) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [displayMenu, setDisplayMenu] = useState(false);

  const dropdownRef = useRef();
  const headerType = type === "group" ? GROUP_HEADER : PROFILE_HEADER;

  const { userState, userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);
  const { user, profile } = userState;

  const displayToast = (toast) => {
    appDispatch({
      type: "SET_TOAST",
      data: {
        ...TOASTS[toast],
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

    enterGroup: async () => {
      setIsRequesting(true);

      const newGroupData = {
        _id: info._id,
        name: info.name,
        url: info.url,
        avatar: info.avatar,
        owner: info.owner,
        moderators: info.moderators,
      };

      const newProfile = {
        ...profile,

        groups:
          profile?.groups?.length > 0
            ? [...profile.groups, { ...newGroupData }]
            : [{ ...newGroupData }],
      };

      const updateCurrentUserReq = await ProfileAPI.updateProfile({
        ...newProfile,
      });

      if (!updateCurrentUserReq) {
        displayToast("enterGroupError");
        setIsRequesting(false);
        return;
      }

      const newGroupInfo = {
        ...info,
        members: [
          ...info?.members,

          {
            _id: profile._id,
            avatar: profile.avatar,
            name: profile.name,
            url: profile.url,
          },
        ],
      };

      const updateGroupReq = await GroupAPI.updateGroup({
        ...newGroupInfo,
      });

      if (!updateGroupReq) {
        displayToast("enterGroupError");
        setIsRequesting(false);
        return;
      }

      updateLocalUser({ ...newProfile });
      setInfo({ ...newGroupInfo });

      setIsRequesting(false);
      displayToast("enterGroupSuccess");
    },
  };

  const getCodition = (condition) => {
    const isSelf = profile._id === info._id;
    const isOwner = profile._id === info.owner;
    const isBlocked = profile.blockedUsers?.find?.(
      (item) => item?._id === info._id
    );

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
        isOwner || !info.members?.find?.((item) => item._id === profile._id),

      isMember:
        isOwner || info.members?.find?.((item) => item._id === profile._id),

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

  return (
    <>
      <S.Head>
        <S.Cover img={info.cover} />

        {profile?._id &&
          headerType.MORE_ACTIONS.filter(
            (item) => !getCodition(item.hideCondition)
          ).length > 0 && (
            <S.DropdownMenu ref={dropdownRef}>
              <Button style='transparent' size={12} onClick={toggleMenu}>
                <FontAwesomeIcon icon={faEllipsisH} />
              </Button>

              <S.Dropdown displayMenu={displayMenu}>
                {headerType.MORE_ACTIONS.filter(
                  (item) => !getCodition(item.hideCondition)
                ).map((item) => {
                  if (!profile?._id || getCodition(item.hideCondition)) {
                    return false;
                  }

                  return (
                    <div key={item.id}>
                      {item.type === "button" ? (
                        <Button
                          style='transparent'
                          size={16}
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
              </S.Dropdown>
            </S.DropdownMenu>
          )}

        <S.Info>
          <S.Avatar>
            {info.avatar ? (
              <Avatar size={128} img={info.avatar} bgColor={"main"} />
            ) : (
              <RoundIcon size={128} icon={faQuestion} bgColor={"main"} />
            )}
          </S.Avatar>

          <S.Center>
            <S.MainInfo>
              <Text type='custom' fs={36} fw={600}>
                {info.name}
              </Text>

              <Text type='subtitle'>@{info.url}</Text>

              <Text type='custom' fs={12} pt={12}>
                {`${
                  type === "profile" ? "Perfil" : "Grupo"
                } criado em: ${getTimeString(info.createdAt)}`}
              </Text>

              {info?.link && (
                <a href={info.link} target='_blank'>
                  <span>{info.link}</span>
                </a>
              )}
            </S.MainInfo>

            <InfoLinks info={info} type={type} />
          </S.Center>

          {profile?._id &&
            headerType.ACTIONS.filter(
              (item) => !getCodition(item.hideCondition)
            ).length > 0 && (
              <S.Actions>
                {headerType.ACTIONS.filter(
                  (item) => !getCodition(item.hideCondition)
                ).map((item) => {
                  return (
                    <div key={item.id}>
                      {item.type === "button" ? (
                        <Button
                          style='primary'
                          size={16}
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
              </S.Actions>
            )}
        </S.Info>
      </S.Head>
    </>
  );
};

export default InfoHeader;
