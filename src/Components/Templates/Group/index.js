// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { GroupContext } from "Contexts/Group";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import Rightbar from "Components/Atoms/Rightbar";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupTemplate = ({ children }) => {
  const { groupState, groupDispatch } = useContext(GroupContext);

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getGroupData = useCallback(async () => {
    const groupReq = await GroupAPI.getGroupByUrl(url);

    if (groupReq) {
      groupDispatch({
        type: "SET_GROUP",
        data: { ...groupReq },
      });
    }
  }, [url, GroupAPI]);

  useEffect(() => {
    getGroupData();
  }, [getGroupData]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${groupState?.name || "Grupo"}`}</title>
      </Head>

      {!groupState?._id && <InfoNotFound type='group' />}

      {groupState?._id && (
        <>
          <S.GroupWrapper bg={groupState?.cover}>
            <S.GroupContent bg={!!groupState?.cover}>
              <InfoHeader info={groupState} type='group' />

              <S.GroupBody>
                <S.GroupLeft>{children}</S.GroupLeft>

                <Rightbar></Rightbar>
              </S.GroupBody>
            </S.GroupContent>
          </S.GroupWrapper>
        </>
      )}
    </AuthedTemplate>
  );
};

export default GroupTemplate;
