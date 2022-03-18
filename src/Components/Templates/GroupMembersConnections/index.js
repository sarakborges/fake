// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";

// Helpers
import { GROUP_MEMBERS_TABS } from "Helpers/Constants";

// Contexts
import { GroupContext } from "Contexts/Group";
import { UserContext } from "Contexts/User";

// Molecules
import Tabs from "Components/Molecules/Tabs";

// Organisms
import FilteredList from "Components/Organisms/FilteredList";

// Templates
import GroupTemplate from "Components/Templates/Group";

// Styles
import * as S from "./style";

const GroupMembersConnectionsTemplate = () => {
  const [members, setMembers] = useState([]);

  const { groupState } = useContext(GroupContext);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getMembers = useCallback(() => {
    if (!groupState?.members?.length || !profile?.connections?.length) {
      return [];
    }

    const connections = profile?.connections
      .filter((item) => item.status === "connected")
      .map((item) => item.user._id);

    setMembers(
      groupState?.members.filter(
        (item) =>
          item.status === "member" && connections.includes(item.profile._id)
      ) || []
    );
  }, [groupState, profile, setMembers]);

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
          info={members.map((item) => {
            return {
              ...item.profile,
              joinedAt: item.joinedAt,
              isOwner: item.profile._id === groupState?.owner,
              isModerator: groupState?.moderators?.includes?.(item.profile._id),
            };
          })}
          id='group-members-filter'
          placeholder='Encontre pessoas'
          type='member'
          title={`Suas conexões, participantes de ${groupState?.name}:`}
          noInfoText={`Nenhuma de suas conexões participa de ${groupState?.name}`}
          parentInfo={groupState}
        />
      </S.MembersWrapper>
    </GroupTemplate>
  );
};

export default GroupMembersConnectionsTemplate;
