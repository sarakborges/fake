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

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import FilteredList from "Components/Organisms/FilteredList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileConnectionsTemplate = () => {
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

  const getApprovedConnections = () => {
    return profileData?.connections?.filter?.((item) => {
      if (item.status === "connected") {
        return item;
      } else {
        return false;
      }
    });
  };

  useEffect(() => {
    getProfile(url);
  }, [url, getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Conexões de ${
          profileData?.name || "Conexões"
        }`}</title>
      </Head>

      {(!profileData?._id ||
        profileData?.blockedUsers?.includes?.(profile?._id)) && (
        <InfoNotFound type='profile' />
      )}

      {profileData?._id &&
        !profileData?.blockedUsers?.includes?.(profile?._id) && (
          <>
            <S.ProfileWrapper>
              <InfoHeader info={profileData} type='profile' />

              <S.ProfileBody>
                <FilteredList
                  info={getApprovedConnections().map((item) => {
                    return {
                      ...item.user,
                      connectedAt: item.connectedAt,
                    };
                  })}
                  id='profile-connections-filter'
                  placeholder='Digite o nome ou @ de quem quer encontrar'
                  type='connection'
                  title={
                    profile?._id === profileData._id
                      ? "Suas conexões:"
                      : `Conexões de ${profileData.name}:`
                  }
                  noInfoText={`${
                    profile?._id === profileData._id ? "Você" : profileData.name
                  } ainda não possui nenhuma conexão.`}
                />

                {profile?._id === profileData._id &&
                  profileData?.blockedUsers?.length > 0 && (
                    <FilteredList
                      info={profileData?.blockedUsers}
                      id='profile-blocked-filter'
                      placeholder='Digite o nome ou @ de quem quer encontrar'
                      type='profile'
                      title='Perfis bloqueados por você:'
                    />
                  )}
              </S.ProfileBody>
            </S.ProfileWrapper>
          </>
        )}
    </AuthedTemplate>
  );
};

export default ProfileConnectionsTemplate;
