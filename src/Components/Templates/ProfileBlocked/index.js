// Dependencies
import { useContext, useEffect, useState } from "react";

// Helpers
import { CONNECTIONS_TABS } from "Helpers/Constants";

// Contexts
import { UserContext } from "Contexts/User";
import { ProfileContext } from "Contexts/Profile";

// Molecules
import Tabs from "Components/Molecules/Tabs";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Templates
import ProfileTemplate from "Components/Templates/Profile";

// Styles
import * as S from "./style";

const ProfileBlockedTemplate = () => {
  const { profileState } = useContext(ProfileContext);
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const [conditions, setConditions] = useState();

  useEffect(() => {
    setConditions({
      isSelf: profileState?._id === profile?._id,
      isNotSelf: profileState?._id !== profile?._id,
    });
  }, [profileState, profile]);

  return (
    <ProfileTemplate>
      <S.ProfileConnections>
        <S.Tabs>
          <Tabs
            tabs={CONNECTIONS_TABS.filter(
              (item) => !conditions?.[item.condition]
            ).map((item) => {
              return {
                ...item,
                link: item.link.replace(":id", profileState?.url),
              };
            })}
          />
        </S.Tabs>

        {profile?._id === profileState?._id && (
          <FilteredList
            info={profileState?.blockedUsers}
            id='profile-blocked-filter'
            placeholder='Encontre pessoas'
            type='profile'
            title='Perfis que você bloqueou:'
            parentInfo={profileState}
            noInfoText={`Você não bloqueou nenhum perfil.`}
          />
        )}
      </S.ProfileConnections>
    </ProfileTemplate>
  );
};

export default ProfileBlockedTemplate;
