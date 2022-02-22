// Dependencies
import { useContext } from "react";

// Contexts
import { ProfileContext } from "Contexts/Profile";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Templates
import ProfileTemplate from "Components/Templates/Profile";

// Styles
import * as S from "./style";

const ProfileGroupsTemplate = () => {
  const { profileState } = useContext(ProfileContext);

  return (
    <ProfileTemplate>
      <S.ProfileGroups>
        <FilteredList
          info={profileState?.groups.map((item) => {
            return {
              ...item.group,
              joinedAt: item.joinedAt,
            };
          })}
          id='non-owned-groups-filter'
          type='group'
          placeholder='Insira sua pesquisa'
          title={`Grupos que ${profileState?.name} participa:`}
          noInfoText={`${profileState?.name} ainda não participa de nenhum grupo.`}
          parentInfo={profileState}
        />
      </S.ProfileGroups>
    </ProfileTemplate>
  );
};

export default ProfileGroupsTemplate;
