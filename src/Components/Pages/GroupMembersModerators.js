// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupMembersModeratorsTemplate from "Components/Templates/GroupMembersModerators";

const GroupMembersModeratorsPage = () => {
  return (
    <GroupProvider>
      <GroupMembersModeratorsTemplate />
    </GroupProvider>
  );
};

export default GroupMembersModeratorsPage;
