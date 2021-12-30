// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { ROUTES } from "Helpers/routes";
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import Input from "Components/Atoms/Input";
import Text from "Components/Atoms/Text";

// Molecules
import Tabs from "Components/Molecules/Tabs";

// Organisms
import GroupHeader from "Components/Organisms/GroupHeader";
import InfoList from "Components/Organisms/InfoList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupMembersMembersTemplate = () => {
  const [group, setGroup] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const [filter, setFilter] = useState("");

  const getMembers = () => {
    if (group?.members?.length < 0) {
      return [];
    }

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

  const tabs = [
    {
      link: ROUTES.GROUP_MEMBERS.MEMBERS.replace(":id", group?.url),
      text: "Membros",
    },

    {
      link: ROUTES.GROUP_MEMBERS.MODERATORS.replace(":id", group?.url),
      text: "Moderadores",
    },

    {
      link: ROUTES.GROUP_MEMBERS.OWNER.replace(":id", group?.url),
      text: "Dono",
    },
  ];

  const getGroup = useCallback(
    async (groupUrl) => {
      const groupData = await GroupAPI.getGroupByUrl(groupUrl);

      if (groupData) {
        setGroup(groupData);
      }
    },
    [GroupAPI]
  );

  useEffect(() => {
    getGroup(url);
  }, [url, getGroup]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${group?.name || "Grupo"} - Membros`}</title>
      </Head>

      {group && (
        <S.Wrapper>
          <GroupHeader group={group} />

          <S.GroupBody>
            <Tabs tabs={tabs} />

            <S.List>
              {getMembers()?.length ? (
                <>
                  <S.Filter>
                    <Input
                      id='grou-members-filter'
                      placeholder='Digite o nome ou @ de quem quer encontrar'
                      value={filter}
                      onChange={handleFilterChange}
                      isBgInverted
                    />
                  </S.Filter>

                  <InfoList type='profile' info={getFilteredMembers()} />
                </>
              ) : (
                <Text>O grupo "{group?.name}" ainda não possui membros.</Text>
              )}
            </S.List>
          </S.GroupBody>
        </S.Wrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupMembersMembersTemplate;
