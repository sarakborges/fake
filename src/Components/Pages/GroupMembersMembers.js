// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupMembersMembersTemplate from "Components/Templates/GroupMembersMembers";

const GroupMembersMembersPage = () => {
  return (
    <GroupProvider>
      <GroupMembersMembersTemplate />
    </GroupProvider>
  );
};

export default GroupMembersMembersPage;
