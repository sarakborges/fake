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
import InfoAbout from "Components/Atoms/InfoAbout";
import Rightbar from "Components/Atoms/Rightbar";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import ProfileRightBar from "Components/Organisms/ProfileRightBar";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileTemplate = () => {
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

  useEffect(() => {
    getProfile(url);
  }, [url, getProfile]);

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
                  <InfoAbout
                    isAdult={profileData.isAdult}
                    about={profileData.about}
                  />
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

export default ProfileTemplate;
