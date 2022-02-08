// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";
import NoFeed from "Components/Molecules/NoFeed";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import Feed from "Components/Organisms/Feed";
import ProfileRightBar from "Components/Organisms/ProfileRightBar";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileFeedTemplate = () => {
  const [feed, setFeed] = useState();
  const [profileData, setProfileData] = useState();

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getProfile = useCallback(
    async (profileUrl) => {
      const profileReq = await ProfileAPI.getProfileByUrl(profileUrl);

      if (profileReq) {
        setProfileData(profileReq);
      }
    },
    [ProfileAPI]
  );

  const getFeed = useCallback(() => {
    if (!profileData?._id) {
      return;
    }

    let feed = [];

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
  }, [setFeed, profileData]);

  useEffect(() => {
    getProfile(url);
  }, [url, getProfile]);

  useEffect(() => {
    getFeed();
  }, [profileData, getFeed]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${profileData?.name || "Perfil"}`}</title>
      </Head>

      {(!profileData?._id ||
        profileData?.blockedUsers?.includes?.(profile?._id)) && (
        <InfoNotFound type='profile' />
      )}

      {profileData?._id &&
        !profileData?.blockedUsers?.includes?.(profile?._id) && (
          <>
            <S.ProfileWrapper>
              <InfoHeader
                info={profileData}
                type='profile'
                setInfo={setProfileData}
              />

              <S.ProfileBody>
                <S.ProfileLeft>
                  {feed?.length > 0 ? (
                    <Feed info={feed} />
                  ) : (
                    <NoFeed name={profileData?.name} />
                  )}
                </S.ProfileLeft>

                <Rightbar>
                  <ProfileRightBar profileData={profileData} />
                </Rightbar>
              </S.ProfileBody>
            </S.ProfileWrapper>
          </>
        )}
    </AuthedTemplate>
  );
};

export default ProfileFeedTemplate;
