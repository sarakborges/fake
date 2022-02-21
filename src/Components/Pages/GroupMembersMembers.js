// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupMembersMembersTemplate from "Components/Templates/GroupMembersMembers";

// Template
const GroupMembersMembersPage = () => {
  return (
    <GroupProvider>
      <GroupMembersMembersTemplate />
    </GroupProvider>
  );
};

export default GroupMembersMembersPage;
