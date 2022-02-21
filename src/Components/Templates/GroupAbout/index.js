// Dependencies
import { useContext } from "react";

// Contexts
import { GroupContext } from "Contexts/Group";

// Atoms
import InfoAbout from "Components/Atoms/InfoAbout";

// Templates
import GroupTemplate from "Components/Templates/Group";

const GroupAboutTemplate = () => {
  const { groupState } = useContext(GroupContext);

  return (
    <GroupTemplate>
      <InfoAbout isAdult={groupState?.isAdult} about={groupState?.about} />
    </GroupTemplate>
  );
};

export default GroupAboutTemplate;
