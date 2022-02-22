// Contexts
import { GroupProvider } from "Contexts/Group";

// Templates
import GroupAboutTemplate from "Components/Templates/GroupAbout";

const GroupAboutPage = () => {
  return (
    <GroupProvider>
      <GroupAboutTemplate />
    </GroupProvider>
  );
};

export default GroupAboutPage;
