// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME, GROUP_MEMBERS_TABS } from "Helpers/Constants";

// Molecules
import Tabs from "Components/Molecules/Tabs";
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import FilteredList from "Components/Organisms/FilteredList";

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

  const getMembers = () => {
    if (group?.members?.length < 0) {
      return [];
    }

    return group?.members.filter(
      (item) =>
        group.owner !== item.profile._id &&
        !group?.moderators?.includes?.(item.profile._id)
    );
  };

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

      {!group?._id && <InfoNotFound type='group' />}

      {group?._id && (
        <>
          <S.Wrapper>
            <InfoHeader info={group} type='group' setInfo={setGroup} />

            <S.GroupBody>
              <Tabs
                tabs={GROUP_MEMBERS_TABS.map((item) => {
                  return {
                    ...item,
                    link: item.link.replace(":id", group.url),
                  };
                })}
              />

              <FilteredList
                info={getMembers().map((item) => {
                  return {
                    ...item.profile,
                    joinedAt: item.joinedAt,
                  };
                })}
                id='group-members-filter'
                placeholder='Digite o nome ou @ de quem quer encontrar'
                type='member'
                title={`Participantes de ${group.name}:`}
                noInfoText={`${group.name} ainda não possui membros.`}
              />
            </S.GroupBody>
          </S.Wrapper>
        </>
      )}
    </AuthedTemplate>
  );
};

export default GroupMembersMembersTemplate;
