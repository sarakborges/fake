// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";
import Head from "next/head";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";

// Molecules
import CreateNew from "Components/Molecules/CreateNew";
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupsTemplate = () => {
  const [profileData, setProfileData] = useState();

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getProfileData = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const profileReq = await ProfileAPI.getProfileById(profile._id);
    setProfileData(profileReq);
  }, [profile, ProfileAPI]);

  useEffect(() => {
    getProfileData();
  }, [profile, getProfileData]);

  const getOwnedGroups = () => {
    if (profileData?.groups?.length < 1) {
      return [];
    }

    return profileData?.groups?.filter((item) => {
      return (
        item.owner === profileData._id ||
        item.moderators.includes(profileData._id)
      );
    });
  };

  const getNonOwnedGroups = () => {
    if (profileData?.groups?.length < 1) {
      return [];
    }

    return profileData?.groups?.filter((item) => {
      return (
        item.owner !== profileData._id &&
        !item.moderators.includes(profileData._id)
      );
    });
  };

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - Seus grupos`}</title>
      </Head>

      {!profile?._id && <NoProfile />}

      {profileData && (
        <S.GroupsListWrapper>
          <CreateNew type='group' />

          <FilteredList
            info={getNonOwnedGroups()}
            id='non-owned-groups-filter'
            type='group'
            placeholder='Digite o nome ou @ do grupo que quer encontrar'
            title={`Grupos que você participa`}
            noInfoText={`Você ainda não participa de nenhum grupo. Explore um pouco, que você encontrará um grupo perfeito pra você!`}
          />

          <FilteredList
            info={getOwnedGroups()}
            id='owned-groups-filter'
            type='group'
            placeholder='Digite o nome ou @ do grupo que quer encontrar'
            title={`Grupos que você gerencia`}
            noInfoText={`Você ainda não gerencia nenhum grupo. Mas, hey! Isso não é da conta de ninguém. Caso você queira criar um grupo, pode clicar ali em cima.`}
          />
        </S.GroupsListWrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupsTemplate;
