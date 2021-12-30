// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { ROUTES } from "Helpers/routes";
import { SITE_NAME } from "Helpers/Constants";

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
const GroupMembersOwnerTemplate = () => {
  const [group, setGroup] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getOwner = () => {
    return group?.members.filter((item) => group.owner === item._id);
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
        <title>{`${SITE_NAME} - ${group?.name || "Grupo"} - Dono`}</title>
      </Head>

      {group && (
        <S.Wrapper>
          <GroupHeader group={group} />

          <S.GroupBody>
            <Tabs tabs={tabs} />

            <S.List>
              <InfoList type='profile' info={getOwner()} />
            </S.List>
          </S.GroupBody>
        </S.Wrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupMembersOwnerTemplate;
