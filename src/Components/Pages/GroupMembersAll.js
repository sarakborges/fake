// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupMembersAllTemplate from "Components/Templates/GroupMembersAll";

const GroupMembersAllPage = () => {
  return (
    <GroupProvider>
      <GroupMembersAllTemplate />
    </GroupProvider>
  );
};

export default GroupMembersAllPage;
