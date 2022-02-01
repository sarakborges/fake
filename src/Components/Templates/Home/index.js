// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";
import NoFeed from "Components/Molecules/NoFeed";

// Organisms
import RoundList from "Components/Organisms/RoundList";
import Feed from "Components/Organisms/Feed";
import NewFeed from "Components/Organisms/NewFeed/";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

// Template
const HomeTemplate = () => {
  const [approvedConnections, setApprovedConnections] = useState();
  const [approvedMemberships, setApprovedMemberships] = useState();
  const [profileData, setProfileData] = useState();
  const [feed, setFeed] = useState();

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
        const member = item?.members?.find(
          (groupItem) => groupItem.profile === profile._id
        );

        if (member?.status === "member") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [profileData, setApprovedMemberships]);

  const getFeed = useCallback(() => {
    if (!profileData?._id) {
      return;
    }

    let feed = [];

    if (approvedConnections?.length) {
      const connections = approvedConnections
        ?.map((item) => item.user)
        .filter((item) => item.feed?.length > 0);

      if (!connections?.length) {
        return feed;
      }

      for (let connection of connections) {
        const connectionFeed = connection.feed.map((item) => {
          return {
            ...item,

            user: {
              name: connection.name,
              avatar: connection.avatar,
              url: connection.url,
            },
          };
        });

        feed = [...feed, ...connectionFeed];
      }
    }

    if (profileData?.feed) {
      feed = [
        ...feed,
        ...profileData?.feed.map((item) => {
          return {
            ...item,
            user: {
              name: profileData.name,
              avatar: profileData.avatar,
              url: profileData.url,
            },
          };
        }),
      ];
    }

    feed.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

    setFeed(feed);
  }, [setFeed, profileData, approvedConnections]);

  useEffect(() => {
    getProfile();
  }, [profile, getProfile]);

  useEffect(() => {
    getFeed();
  }, [profileData, getFeed]);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [profileData, getApprovedConnections, getApprovedMemberships]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Home</title>
      </Head>

      {!profileData?._id && <NoProfile />}

      {profileData?._id && (
        <S.HomeWrapper>
          <S.FeedWrapper>
            <NewFeed feed={feed} setFeed={setFeed} />

            {feed?.length > 0 ? <Feed info={feed} /> : <NoFeed />}
          </S.FeedWrapper>

          <Rightbar>
            <RoundList
              type='profile'
              title='Suas conexões'
              emptyTitle='Você ainda não possui conexões'
              extraItemLink={ROUTES.CONNECTIONS}
              list={approvedConnections?.slice?.(0, 5).map((item) => item.user)}
            />

            <RoundList
              type='group'
              title='Seus grupos'
              emptyTitle='Você ainda não participa de grupos'
              extraItemLink={ROUTES.GROUPS}
              list={approvedMemberships?.slice?.(0, 5)}
            />
          </Rightbar>
        </S.HomeWrapper>
      )}
    </AuthedTemplate>
  );
};

export default HomeTemplate;
