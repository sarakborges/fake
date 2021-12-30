// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";

// Organisms
import ProfileHeader from "Components/Organisms/ProfileHeader";
import RoundList from "Components/Organisms/RoundList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileTemplate = () => {
  const [profile, setProfile] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getProfile = useCallback(
    async (profileUrl) => {
      const profileData = await ProfileAPI.getProfileByUrl(profileUrl);

      if (profileData) {
        setProfile(profileData);
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
        <title>{`${SITE_NAME} - ${profile?.name || "Perfil"}`}</title>
      </Head>

      {profile && (
        <S.ProfileWrapper>
          <ProfileHeader profile={profile} />

          <S.ProfileBody>
            <S.About>
              <div dangerouslySetInnerHTML={{ __html: profile.about }} />
            </S.About>

            <Rightbar>
              <RoundList
                type='profile'
                title='Conexões'
                emptyTitle='Ainda não possui conexões'
                list={profile?.connections}
                extraItemLink={ROUTES.PROFILE_CONNECTIONS.replace(
                  ":id",
                  profile.url
                )}
              />

              <RoundList
                type='group'
                title='Grupos'
                emptyTitle='Ainda não participa de grupos'
                list={profile?.groups}
                extraItemLink={ROUTES.GROUP_MEMBERS.MEMBERS.replace(
                  ":id",
                  profile.url
                )}
              />
            </Rightbar>
          </S.ProfileBody>
        </S.ProfileWrapper>
      )}
    </AuthedTemplate>
  );
};

export default ProfileTemplate;
