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
import InfoAbout from "Components/Atoms/InfoAbout";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
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

  const getGroup = useCallback(async () => {
    const groupData = await GroupAPI.getGroupByUrl(url);

    if (groupData) {
      setGroup(groupData);
    }
  }, [url, GroupAPI]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${group?.name || "Grupo"}`}</title>
      </Head>

      {!group?._id && <InfoNotFound type='group' />}

      {group?._id && (
        <>
          <S.GroupWrapper>
            <InfoHeader info={group} type='group' setInfo={setGroup} />

            <S.GroupBody>
              <S.GroupLeft>
                <InfoAbout isAdult={group.isAdult} about={group.about} />
              </S.GroupLeft>

              <Rightbar>
                <RoundList
                  type='profile'
                  title='Membros'
                  list={group.members.slice(0, 5).map((item) => item.profile)}
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
        </>
      )}
    </AuthedTemplate>
  );
};

export default GroupTemplate;
