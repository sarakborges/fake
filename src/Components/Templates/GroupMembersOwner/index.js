// Dependencies
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";
import ProfileAPI from "Apis/Profile";

// Organisms
import InfoList from "Components/Organisms/InfoList";

// Template
import GroupMembers from "Components/Templates/GroupMembers";

// Template
const GroupMembersTemplate = () => {
  const [group, setGroup] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getGroup = useCallback(
    async (groupUrl) => {
      const groupData = await GroupAPI.getGroupByUrl(groupUrl);

      for (let memberItem in groupData.members) {
        const profile = await ProfileAPI.getProfileById(
          groupData.members[memberItem]
        );
        groupData.members[memberItem] = profile;
      }

      if (groupData) {
        setGroup(groupData);
      }
    },
    [GroupAPI]
  );

  const getOwner = () => {
    return group?.members.filter((item) => group.owner === item._id);
  };

  useEffect(() => {
    getGroup(url);
  }, [url, getGroup]);

  return (
    <GroupMembers>
      <InfoList type='profile' info={getOwner()} />
    </GroupMembers>
  );
};

export default GroupMembersTemplate;
