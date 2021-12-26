// Dependencies
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";
import ProfileAPI from "Apis/Profile";

// Atoms
import Input from "Components/Atoms/Input";

// Organisms
import InfoList from "Components/Organisms/InfoList";

// Templates
import GroupMembers from "Components/Templates/GroupMembers";

// Styles
import * as S from "./style";
import Text from "Components/Atoms/Text";

// Template
const GroupMembersTemplate = () => {
  const [group, setGroup] = useState(undefined);
  const [filter, setFilter] = useState("");

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

  const getMembers = () => {
    return group?.members.filter(
      (item) => group.owner !== item._id && !group.moderators.includes(item._id)
    );
  };

  const getFilteredMembers = () => {
    if (!filter) {
      return getMembers();
    }

    return getMembers().filter(
      (item) =>
        item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
        `@${item.url}`.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  useEffect(() => {
    getGroup(url);
  }, [url, getGroup]);

  return (
    <GroupMembers>
      {getMembers()?.length ? (
        <>
          <S.Filter>
            <Input
              id='grou-members-filter'
              placeholder='Digite o nome ou @ de quem quer encontrar'
              value={filter}
              onChange={handleFilterChange}
            />
          </S.Filter>

          <InfoList type='profile' info={getFilteredMembers()} />
        </>
      ) : (
        <Text>O grupo "{group?.name}" ainda não possui membros.</Text>
      )}
    </GroupMembers>
  );
};

export default GroupMembersTemplate;
