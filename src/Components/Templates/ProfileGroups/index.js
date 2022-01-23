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
import AdultWarning from "Components/Molecules/AdultWarning";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import FilteredList from "Components/Organisms/FilteredList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileGroupsTemplate = () => {
  const [profileData, setProfileData] = useState();
  const [displayAdult, setDisplayAdult] = useState(false);

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

  const getOwnedGroups = () => {
    if (profileData?.groups?.length < 1) {
      return [];
    }

    return profileData?.groups?.filter((item) => {
      return (
        item.owner === profileData._id ||
        item?.moderators?.includes?.(profileData._id)
      );
    });
  };

  const getNonOwnedGroups = () => {
    if (profileData?.groups?.length < 1) {
      return [];
    }

    return profileData?.groups?.filter((item) => {
      return (
        item?.owner !== profileData._id &&
        !item?.moderators?.includes?.(profileData._id)
      );
    });
  };

  useEffect(() => {
    getProfile(url);
  }, [url, getProfile]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Grupos de ${
          profileData?.name || "Grupos"
        }`}</title>
      </Head>

      {(!profileData?._id ||
        profileData?.blockedUsers?.includes?.(profile?._id)) && (
        <InfoNotFound type='profile' />
      )}

      {profileData?._id &&
        !profileData?.blockedUsers?.includes?.(profile?._id) && (
          <>
            {profileData?._id !== profile?._id &&
            !displayAdult &&
            profileData?.isAdult ? (
              <AdultWarning setDisplayAdult={setDisplayAdult} type='profile' />
            ) : (
              <S.ProfileWrapper>
                <InfoHeader info={profileData} type='profile' />

                <S.ProfileBody>
                  <FilteredList
                    info={getNonOwnedGroups()}
                    id='non-owned-groups-filter'
                    type='group'
                    placeholder='Digite o nome ou @ do grupo que quer encontrar'
                    title={`Grupos que ${
                      profile?._id === profileData._id
                        ? "você"
                        : profileData.name
                    } participa:`}
                    noInfoText={`${
                      profile?._id === profileData._id
                        ? "Você"
                        : profileData.name
                    } ainda não participa de nenhum grupo.`}
                  />

                  <FilteredList
                    info={getOwnedGroups()}
                    id='non-groups-filter'
                    type='group'
                    placeholder='Digite o nome ou @ do grupo que quer encontrar'
                    title={`Grupos que ${
                      profile?._id === profileData._id
                        ? "você"
                        : profileData.name
                    } administra:`}
                    noInfoText={`${
                      profile?._id === profileData._id
                        ? "Você"
                        : profileData.name
                    } ainda não administra de nenhum grupo.`}
                  />
                </S.ProfileBody>
              </S.ProfileWrapper>
            )}
          </>
        )}
    </AuthedTemplate>
  );
};

export default ProfileGroupsTemplate;
