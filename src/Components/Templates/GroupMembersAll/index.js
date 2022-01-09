// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME, GROUP_MEMBERS_TABS } from "Helpers/Constants";

// Molecules
import Tabs from "Components/Molecules/Tabs";

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

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getMembers = () => {
    if (group?.members?.length < 0) {
      return [];
    }

    return group?.members.map((item) => {
      if (group.owner === item._id) {
        return {
          ...item,
          name: (
            <S.Owner>
              <span>{item.name}</span>
              <FontAwesomeIcon icon={faCrown} />
            </S.Owner>
          ),
        };
      } else if (group.moderators.includes(item._id)) {
        return {
          ...item,
          name: (
            <S.Moderator>
              <span>{item.name}</span>
              <FontAwesomeIcon icon={faCrown} />
            </S.Moderator>
          ),
        };
      } else {
        return { ...item };
      }
    });
  };

  const getGroup = useCallback(
    async (groupUrl) => {
      const groupReq = await GroupAPI.getGroupByUrl(groupUrl);

      if (groupReq) {
        setGroup(groupReq);
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
          <InfoHeader info={group} type='group' setInfo={setGroup} />

          <S.GroupBody>
            <Tabs
              tabs={GROUP_MEMBERS_TABS.map((item) => {
                return { ...item, link: item.link.replace(":id", group.url) };
              })}
            />

            <FilteredList
              info={getMembers()}
              id='group-members-filter'
              placeholder='Digite o nome ou @ de quem quer encontrar'
              type='profile'
              title={`Membros de ${group.name}:`}
              noInfoText={`${group.name} ainda não possui membros.`}
            />
          </S.GroupBody>
        </S.Wrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupMembersAllTemplate;
