// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";

// Contexts
import { UserContext } from "Contexts/User";
import { ProfileContext } from "Contexts/Profile";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Template
import ProfileTemplate from "Components/Templates/Profile";

// Styles
import * as S from "./style";

// Template
const ProfileConnectionsTemplate = () => {
  const { profileState } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const [approvedConnections, setApprovedConnections] = useState([]);

  const getApprovedConnections = useCallback(() => {
    if (!profileState?._id) {
      return;
    }

    const filteredConnections = profileState?.connections
      ?.filter?.((item) => {
        if (item.status === "connected") {
          return item;
        } else {
          return false;
        }
      })
      .map((item) => {
        return {
          ...item.user,
          connectedAt: item.connectedAt,
        };
      });

    setApprovedConnections(filteredConnections);
  }, [profileState]);

  useEffect(() => {
    getApprovedConnections();
  }, [getApprovedConnections]);

  return (
    <ProfileTemplate>
      <S.ProfileConnections>
        <FilteredList
          info={approvedConnections}
          id='profile-connections-filter'
          placeholder='Insira sua pesquisa'
          type='connection'
          title={`Conexões de ${profileState?.name}:`}
          noInfoText={`${profileState?.name} ainda não possui nenhuma conexão.`}
          parentInfo={profileState}
        />

        {profile?._id === profileState?._id &&
          profileState?.blockedUsers?.length > 0 && (
            <FilteredList
              info={profileState?.blockedUsers}
              id='profile-blocked-filter'
              placeholder='Insira sua pesquisa'
              type='profile'
              title='Perfis que você bloqueou:'
              parentInfo={profileState}
            />
          )}
      </S.ProfileConnections>
    </ProfileTemplate>
  );
};

export default ProfileConnectionsTemplate;
