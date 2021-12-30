// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";

// Organisms
import GroupHeader from "Components/Organisms/GroupHeader";
import RoundList from "Components/Organisms/RoundList";
import LinkList from "Components/Organisms/LinkList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupTemplate = () => {
  const [group, setGroup] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

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
        <title>{`${SITE_NAME} - ${group?.name || "Grupo"}`}</title>
      </Head>

      {group && (
        <S.GroupWrapper>
          <GroupHeader group={group} />

          <S.GroupBody>
            <S.About>
              <div dangerouslySetInnerHTML={{ __html: group.about }} />
            </S.About>

            <Rightbar>
              <RoundList
                type='profile'
                title='Membros'
                list={group.members.slice(0, 5)}
                extraItemLink={ROUTES.GROUP_MEMBERS.MEMBERS.replace(
                  ":id",
                  group.url
                )}
              />

              <RoundList
                type='group'
                title='Grupos relacionados'
                list={group?.relatedGroups?.slice?.(0, 5)}
                extraItemLink='#'
                hideEmpty
              />

              <LinkList
                title='Links importantes'
                list={group?.importantLinks}
                hideEmpty
              />

              <LinkList title='Tags' list={group?.tags} hideEmpty />
            </Rightbar>
          </S.GroupBody>
        </S.GroupWrapper>
      )}
    </AuthedTemplate>
  );
};

export default GroupTemplate;
