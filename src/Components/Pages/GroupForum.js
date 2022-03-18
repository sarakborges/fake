// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupForumTemplate from "Components/Templates/GroupForum";

const GroupForumPage = () => {
  return (
    <GroupProvider>
      <GroupForumTemplate />
    </GroupProvider>
  );
};

export default GroupForumPage;
