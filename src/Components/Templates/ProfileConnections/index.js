// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import Text from "Components/Atoms/Text";

// Organisms
import ProfileHeader from "Components/Organisms/ProfileHeader";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileConnectionsTemplate = ({ children }) => {
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

  const getFilteredConnections = () => {
    if (!filter) {
      return profile?.connections;
    }

    return profile?.connections.filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        `@${item.url}`.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  useEffect(() => {
    getProfile(url);
  }, [url, getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${profile?.name || "Perfil"}`}</title>
      </Head>

      {profile && (
        <>
          <ProfileHeader profile={profile} />

          <S.ProfileBody>
            {profile?.connections?.length ? (
              <>
                <S.Filter>
                  <Input
                    id='grou-members-filter'
                    placeholder='Digite o nome ou @ de quem quer encontrar'
                    value={filter}
                    onChange={handleFilterChange}
                  />
                </S.Filter>

                <InfoList type='profile' info={getFilteredConnections()} />
              </>
            ) : (
              <Text>{profile?.name} ainda não possui conexões.</Text>
            )}
          </S.ProfileBody>
        </>
      )}
    </AuthedTemplate>
  );
};

export default ProfileConnectionsTemplate;
