// Dependencies
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

// APIs
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
import InfoLinks from "Components/Atoms/InfoLinks";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";
import TagsList from "Components/Molecules/TagsList";
import ConnectButton from "Components/Molecules/ConnectButton";
import AcceptConnectionButton from "Components/Molecules/AcceptConnectionButton";
import UnconnectButton from "Components/Molecules/UnconnectButton";
import BlockProfileButton from "Components/Molecules/BlockProfileButton";
import UnblockProfileButton from "Components/Molecules/UnblockProfileButton";
import JoinGroupButton from "Components/Molecules/JoinGroupButton";
import LeaveGroupButton from "Components/Molecules/LeaveGroupButton";

// Style
import * as S from "./style";

const InfoHeader = ({ info, type }) => {
  const [tags, setTags] = useState([]);

  const headerType = type === "group" ? GROUP_HEADER : PROFILE_HEADER;

  const { userState, userDispatch } = useContext(UserContext);
  const { user, profile } = userState;

  const { appState } = useContext(AppContext);
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

  const headerButtons = {
    connectTo: <ConnectButton />,
    cancelConnection: <UnconnectButton>Cancelar solicitação</UnconnectButton>,
    removeConnection: <UnconnectButton>Remover conexão</UnconnectButton>,
    blockProfile: <BlockProfileButton />,
    unBlockProfile: <UnblockProfileButton />,
    joinGroup: <JoinGroupButton />,
    leaveGroup: <LeaveGroupButton />,
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

    if (info?.tags) {
      newTags = [...newTags, ...info?.tags];
    }

    newTags.sort((a, b) => (a > b ? 1 : -1));

    setTags(newTags);
  }, [info]);

  return (
    <>
      {profile?._id && !getCondition("isNotSent") && (
        <S.PendingAction>
          <S.PendingText>
            <b>Ação pendente:</b>
            <> Aceitar solicitação de conexão de </>
            <b>{info?.name}</b>
            <>?</>
          </S.PendingText>

          <S.PendingButtons>
            <AcceptConnectionButton colored>
              <FontAwesomeIcon icon={faCheckCircle} />
              <>Aceitar</>
            </AcceptConnectionButton>

            <UnconnectButton colored>
              <FontAwesomeIcon icon={faTimesCircle} />
              <>Recusar</>
            </UnconnectButton>
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
