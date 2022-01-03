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
import Text from "Components/Atoms/Text";
import Input from "Components/Atoms/Input";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import InfoList from "Components/Organisms/InfoList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileConnectionsTemplate = () => {
  const [profileData, setProfileData] = useState();
  const [filter, setFilter] = useState("");

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getProfile = useCallback(
    async (profileUrl) => {
      const profileData = await ProfileAPI.getProfileByUrl(profileUrl);

      if (profileData) {
        setProfileData(profileData);
      }
    },
    [ProfileAPI]
  );

  const getApprovedConnections = () => {
    return profile?.connections?.filter?.((item) => {
      if (item.status === "connected") {
        return item;
      } else {
        return false;
      }
    });
  };

  const getFilteredConnections = () => {
    if (!filter) {
      return getApprovedConnections();
    }

    return getApprovedConnections().filter(
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
        <title>{`${SITE_NAME} - ${profileData?.name || "Perfil"}`}</title>
      </Head>

      {(!profileData?._id ||
        profileData?.blockedUsers?.includes?.(profile?._id)) && (
        <InfoNotFound type='profile' />
      )}

      {profileData?._id &&
        !profileData?.blockedUsers?.includes?.(profile?._id) && (
          <S.ProfileWrapper>
            <InfoHeader info={profileData} type='profile' />

            <S.ProfileBody>
              {getApprovedConnections()?.length ? (
                <>
                  <S.Filter>
                    <Input
                      id='grou-members-filter'
                      placeholder='Digite o nome ou @ de quem quer encontrar'
                      value={filter}
                      onChange={handleFilterChange}
                      isBgInverted
                    />
                  </S.Filter>

                  <InfoList
                    type='profile'
                    info={getFilteredConnections().map((item) => item.user)}
                  />
                </>
              ) : (
                <Text type='subtitle'>
                  <b>{profileData?.name}</b> ainda não possui conexões.
                </Text>
              )}
            </S.ProfileBody>
          </S.ProfileWrapper>
        )}
    </AuthedTemplate>
  );
};

export default ProfileConnectionsTemplate;
