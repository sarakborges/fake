// Dependencies
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";
import ProfileAPI from "Apis/Profile";

// Atoms
import Text from "Components/Atoms/Text";

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

  const getModerators = () => {
    return group?.members.filter(
      (item) => group.owner !== item._id && group.moderators.includes(item._id)
    );
  };

  useEffect(() => {
    getGroup(url);
  }, [url, getGroup]);

  return (
    <GroupMembers>
      {getModerators()?.length ? (
        <InfoList type='profile' info={getModerators()} />
      ) : (
        <Text type='text'>
          O grupo "{group?.name}" ainda não possui moderadores.
        </Text>
      )}
    </GroupMembers>
  );
};

export default GroupMembersTemplate;
