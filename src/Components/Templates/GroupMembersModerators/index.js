// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";

// Helpers
import { GROUP_MEMBERS_TABS } from "Helpers/Constants";

// Contexts
import { GroupContext } from "Contexts/Group";

// Molecules
import Tabs from "Components/Molecules/Tabs";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Templates
import GroupTemplate from "Components/Templates/Group";

// Styles
import * as S from "./style";

const GroupMembersModeratorsTemplate = () => {
  const [members, setMembers] = useState([]);

  const { groupState } = useContext(GroupContext);

  const getMembers = useCallback(() => {
    if (!groupState?.members?.length) {
      return [];
    }

    setMembers(
      groupState?.members.filter(
        (item) =>
          groupState?.owner === item.profile._id ||
          groupState?.moderators?.includes?.(item.profile._id)
      )
    );
  }, [groupState, setMembers]);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

  return (
    <GroupTemplate>
      <S.MembersWrapper>
        <Tabs
          tabs={GROUP_MEMBERS_TABS.map((item) => {
            return {
              ...item,
              link: item.link.replace(":id", groupState?.url),
            };
          })}
        />

        <FilteredList
          info={members?.map((item) => {
            return {
              ...item.profile,
              joinedAt: item.joinedAt,
            };
          })}
          id='group-members-filter'
          placeholder='Insira sua pesquisa'
          type='member'
          title={`Moderadores de ${groupState?.name}:`}
          parentInfo={groupState}
        />
      </S.MembersWrapper>
    </GroupTemplate>
  );
};

export default GroupMembersModeratorsTemplate;
