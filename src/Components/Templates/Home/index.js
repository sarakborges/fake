// Dependencies
import Head from "next/head";
import Link from "next/link";
import { useCallback, useContext, useEffect, useState } from "react";
import { faEllipsisH, faQuestion } from "@fortawesome/free-solid-svg-icons";

// APIs
import ProfileAPI from "Apis/Profile";
import MessageAPI from "Apis/Message";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Text from "Components/Atoms/Text";
import ButtonLink from "Components/Atoms/ButtonLink";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Organisms
import Feed from "Components/Organisms/Feed";
import ChatUsers from "Components/Organisms/ChatUsers";
import LinkList from "Components/Organisms/LinkList";

// Templates
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

const HomeTemplate = () => {
  const [approvedConnections, setApprovedConnections] = useState([]);
  const [approvedMemberships, setApprovedMemberships] = useState([]);
  const [profileData, setProfileData] = useState();
  const [chatUsers, setChatUsers] = useState();

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getProfile = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const profileReq = await ProfileAPI.getProfileById(profile._id);

    if (profileReq) {
      setProfileData(profileReq);
    }
  }, [profile, ProfileAPI]);

  const getApprovedConnections = useCallback(() => {
    setApprovedConnections(
      profileData?.connections?.filter?.((item) => {
        if (item.status === "connected") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [profileData, setApprovedConnections]);

  const getApprovedMemberships = useCallback(() => {
    setApprovedMemberships(
      profileData?.groups?.filter?.((item) => {
        if (item.status === "member") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [profileData, setApprovedMemberships]);

  const getChatUsers = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const chatUsersReq = await MessageAPI.getAllMessages(profile._id);

    if (chatUsersReq) {
      setChatUsers(chatUsersReq);
    }
  }, [profile, MessageAPI]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [getApprovedConnections, getApprovedMemberships]);

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Home</title>
      </Head>

      {!profileData?._id && <NoProfile />}

      {profileData?._id && (
        <S.HomeWrapper>
          <S.Lists>
            <S.ProfileWrapper>
              <ProfilePicture avatar={profileData?.avatar} size={128} />

              <Text type='title'>{profileData?.name}</Text>

              <Text type='subtitle' pb={16}>
                @{profileData?.url}
              </Text>

              <S.ProfileButtons>
                <ButtonLink
                  href={ROUTES.PROFILE.replace(":id", profileData?.url)}
                >
                  Ver perfil
                </ButtonLink>

                <ButtonLink
                  href={ROUTES.SETTINGS.PROFILE.replace(
                    ":id",
                    profileData?.url
                  )}
                >
                  Editar perfil
                </ButtonLink>
              </S.ProfileButtons>
            </S.ProfileWrapper>

            <S.Counters>
              <Link
                href={ROUTES.PROFILE_CONNECTIONS.replace(
                  ":id",
                  profileData?.url
                )}
              >
                <a>
                  <Text type='custom' fs={20} fw={600} lh={1.4}>
                    {approvedConnections.length}
                  </Text>

                  <Text type='custom' fs={14} lh={1.4}>
                    {approvedConnections.length !== 1 ? "Conexões" : "Conexão"}
                  </Text>
                </a>
              </Link>

              <Link
                href={ROUTES.PROFILE_GROUPS.replace(":id", profileData?.url)}
              >
                <a>
                  <Text type='custom' fs={20} fw={600} lh={1.4}>
                    {approvedMemberships.length}
                  </Text>

                  <Text type='custom' fs={14} lh={1.4}>
                    {approvedMemberships.length !== 1 ? "Grupos" : "Grupo"}
                  </Text>
                </a>
              </Link>
            </S.Counters>

            {[
              ...(profileData?.privateTags || []),
              ...(profileData?.publicTags || []),
            ].length > 0 && (
              <LinkList
                list={[
                  ...(profileData?.privateTags || []),
                  ...(profileData?.publicTags || []),
                ]}
                title='Suas tags'
              />
            )}
          </S.Lists>

          <S.FeedWrapper>
            <Feed
              profile={profileData}
              connections={approvedConnections}
              displayNewFeed
            />
          </S.FeedWrapper>

          <S.ChatWrapper>
            {chatUsers?.length > 0 && (
              <Text type='custom' pt={16} pl={16} fw={600}>
                Suas mensagens recentes
              </Text>
            )}

            <ChatUsers usersList={chatUsers} />
          </S.ChatWrapper>
        </S.HomeWrapper>
      )}
    </AuthedTemplate>
  );
};

export default HomeTemplate;
