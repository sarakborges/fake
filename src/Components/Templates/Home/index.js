// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";
import { MessagesContext } from "Contexts/Messages";

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
import RoundList from "Components/Organisms/RoundList";

const HomeTemplate = () => {
  const [approvedConnections, setApprovedConnections] = useState([]);
  const [approvedMemberships, setApprovedMemberships] = useState([]);
  const [profileData, setProfileData] = useState();

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const { messagesState } = useContext(MessagesContext);
  const { chatUsers } = messagesState;

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

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [getApprovedConnections, getApprovedMemberships]);

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
              <S.ProfileContent>
                <ProfilePicture avatar={profileData?.avatar} size={128} />

                <Text
                  type='custom'
                  fs={20}
                  fw={400}
                  pt={16}
                  lh={1.4}
                  ta='center'
                  fc='white'
                >
                  {profileData?.name}
                </Text>

                <Text type='custom' pb={16} pt={8} ta='center'>
                  @{profileData?.url}
                </Text>
              </S.ProfileContent>

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

            <RoundList
              list={approvedConnections.slice(0, 14).map((item) => item.user)}
              title='Suas conexões'
              type='profile'
              extraItemLink={ROUTES.PROFILE_CONNECTIONS.replace(
                ":id",
                profileData?.url
              )}
              emptyTitle={"Você ainda não possui conexões"}
            />

            <RoundList
              list={approvedMemberships.slice(0, 14).map((item) => item.group)}
              title='Seus grupos'
              type='group'
              extraItemLink={ROUTES.PROFILE_GROUPS.replace(
                ":id",
                profileData?.url
              )}
              emptyTitle={"Você ainda não participa de grupos"}
            />

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
