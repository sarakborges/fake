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
  const [profileData, setProfileData] = useState();

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

  const getApprovedConnections = () => {
    return (
      profileData?.connections?.filter?.((item) => {
        if (item.status === "connected") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  };

  const getApprovedMembership = () => {
    return (
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
  };

  const getFeed = () => {
    let feed = [];

    if (getApprovedConnections()?.length) {
      const connections = getApprovedConnections()
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

    feed = [
      ...feed,
      ...profile?.feed.map((item) => {
        return {
          ...item,
          user: {
            name: profile.name,
            avatar: profile.avatar,
            url: profile.url,
          },
        };
      }),
    ];

    feed.sort((a, b) => (a.postedAt < b.postedAt ? 1 : -1));

    return feed;
  };

  useEffect(() => {
    getProfile();
  }, [profile, getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Home</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profile?._id && (
        <S.HomeWrapper>
          <S.FeedWrapper>
            <NewFeed />

            <Feed info={getFeed()} />
          </S.FeedWrapper>

          <Rightbar>
            <RoundList
              type='profile'
              title='Suas conexões'
              emptyTitle='Você ainda não possui conexões'
              extraItemLink={ROUTES.CONNECTIONS}
              list={getApprovedConnections()
                ?.slice?.(0, 5)
                .map((item) => item.user)}
            />

            <RoundList
              type='group'
              title='Seus grupos'
              emptyTitle='Você ainda não participa de grupos'
              extraItemLink={ROUTES.GROUPS}
              list={getApprovedMembership().slice?.(0, 5)}
            />
          </Rightbar>
        </S.HomeWrapper>
      )}
    </AuthedTemplate>
  );
};

export default HomeTemplate;
