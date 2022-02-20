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
const GroupMembersAllTemplate = () => {
  const [group, setGroup] = useState();
  const [members, setMembers] = useState([]);

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getMembers = useCallback(() => {
    if (!group?.members?.length) {
      return [];
    }

    setMembers(group?.members.filter((item) => item.status === "member") || []);
  }, [group, setMembers]);

  const getGroup = useCallback(async () => {
    const groupReq = await GroupAPI.getGroupByUrl(url);

    if (groupReq) {
      setGroup(groupReq);
    }
  }, [GroupAPI]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  useEffect(() => {
    getMembers();
  }, [getMembers]);

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
                info={members.map((item) => {
                  return {
                    ...item.profile,
                    joinedAt: item.joinedAt,
                    isOwner: item.profile._id === group.owner,
                    isModerator: group?.moderators?.includes?.(
                      item.profile._id
                    ),
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

export default GroupMembersAllTemplate;
