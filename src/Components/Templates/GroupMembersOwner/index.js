// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME, GROUP_MEMBERS_TABS } from "Helpers/Constants";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import Tabs from "Components/Molecules/Tabs";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import InfoList from "Components/Organisms/InfoList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupMembersOwnerTemplate = () => {
  const [group, setGroup] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getOwner = () => {
    return group?.members.filter((item) => group.owner === item._id);
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
        <title>{`${SITE_NAME} - ${group?.name || "Grupo"} - Dono`}</title>
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

            <div>
              <Text type='title' pb={32}>
                Dono de {group.name}
              </Text>

              <InfoList type='profile' info={getOwner()} />
            </div>
          </S.GroupBody>
        </S.Wrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupMembersOwnerTemplate;
