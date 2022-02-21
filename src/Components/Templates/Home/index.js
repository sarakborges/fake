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
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import Feed from "Components/Organisms/Feed";
import ChatUsers from "Components/Organisms/ChatUsers";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";
import RoundList from "Components/Organisms/RoundList";
import LinkList from "Components/Organisms/LinkList";

// Template
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
          <S.LeftWrapper>
            <Feed
              profile={profileData}
              connections={approvedConnections}
              displayNewFeed
            />
          </S.LeftWrapper>

          <S.RightLists>
            <RoundList
              list={approvedConnections.map((item) => item.user)}
              title='Suas conexões'
              type='profile'
              displayMore={approvedConnections?.length > 5}
              extraItemLink={ROUTES.PROFILE_CONNECTIONS.replace(
                ":id",
                profileData?.url
              )}
            />

            <RoundList
              list={approvedMemberships.map((item) => item.group)}
              title='Seus grupos'
              type='group'
              displayMore={approvedMemberships?.length > 5}
              extraItemLink={ROUTES.PROFILE_GROUPS.replace(
                ":id",
                profileData?.url
              )}
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
          </S.RightLists>

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
