// Dependencies
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import InfoAbout from "Components/Atoms/InfoAbout";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import GroupRightBar from "Components/Organisms/GroupRightBar";
import Rightbar from "Components/Atoms/Rightbar";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const GroupTemplate = () => {
  const [groupData, setGroupData] = useState();

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getGroupData = useCallback(async () => {
    const groupReq = await GroupAPI.getGroupByUrl(url);

    if (groupReq) {
      setGroupData(groupReq);
    }
  }, [url, GroupAPI]);

  useEffect(() => {
    getGroupData();
  }, [getGroupData]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${groupData?.name || "Grupo"}`}</title>
      </Head>

      {!groupData?._id && <InfoNotFound type='group' />}

      {groupData?._id && (
        <>
          <S.GroupWrapper>
            <InfoHeader info={groupData} type='group' setInfo={setGroupData} />

            <S.GroupBody>
              <S.GroupLeft>
                <InfoAbout
                  isAdult={groupData.isAdult}
                  about={groupData.about}
                />
              </S.GroupLeft>

              <Rightbar>
                <GroupRightBar group={groupData} />
              </Rightbar>
            </S.GroupBody>
          </S.GroupWrapper>
        </>
      )}
    </AuthedTemplate>
  );
};

export default GroupTemplate;
