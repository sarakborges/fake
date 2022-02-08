// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import RoundList from "Components/Organisms/RoundList";
import Feed from "Components/Organisms/Feed";
import SearchForm from "Components/Organisms/SearchForm";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";

// Template
const HomeTemplate = () => {
  const [approvedConnections, setApprovedConnections] = useState();
  const [approvedMemberships, setApprovedMemberships] = useState();
  const [profileData, setProfileData] = useState();

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const getProfile = useCallback(async () => {
    if (!profile?._id) {
      return;
    }

    const profileReq = await ProfileAPI.getProfileById(profile._id);

    if (profileReq) {
      setProfileData(profileReq);
    }
  }, [profile, ProfileAPI]);

  const getApprovedConnections = useCallback(() => {
    setApprovedConnections(
      profileData?.connections?.filter?.((item) => {
        if (item.status === "connected") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [profileData, setApprovedConnections]);

  const getApprovedMemberships = useCallback(() => {
    setApprovedMemberships(
      profileData?.groups?.filter?.((item) => {
        const member = item?.members?.find(
          (groupItem) => groupItem.profile === profile._id
        );

        if (member?.status === "member") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [profileData, setApprovedMemberships]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [getApprovedConnections, getApprovedMemberships]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{SITE_NAME} - Home</title>
      </Head>

      {!profileData?._id && <NoProfile />}

      {profileData?._id && (
        <S.HomeWrapper>
          <S.FeedWrapper>
            <Feed profile={profileData} connections={approvedConnections} />
          </S.FeedWrapper>

          <Rightbar>
            <SearchForm />

            <RoundList
              type='profile'
              title='Suas conexões'
              emptyTitle='Você ainda não possui conexões'
              extraItemLink={ROUTES.PROFILE_CONNECTIONS.replace(
                ":id",
                profileData?.url
              )}
              displayMore={approvedConnections?.length > 5}
              list={approvedConnections?.slice?.(0, 5).map((item) => item.user)}
            />

            <RoundList
              type='group'
              title='Seus grupos'
              emptyTitle='Você ainda não participa de grupos'
              extraItemLink={ROUTES.GROUPS}
              displayMore={approvedMemberships?.length > 5}
              list={approvedMemberships?.slice?.(0, 5)}
            />
          </Rightbar>
        </S.HomeWrapper>
      )}
    </AuthedTemplate>
  );
};

export default HomeTemplate;
