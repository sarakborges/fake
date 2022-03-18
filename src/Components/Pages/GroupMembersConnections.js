// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupMembersConnectionsTemplate from "Components/Templates/GroupMembersConnections";

const GroupMembersConnectionsPage = () => {
  return (
    <GroupProvider>
      <GroupMembersConnectionsTemplate />
    </GroupProvider>
  );
};

export default GroupMembersConnectionsPage;
