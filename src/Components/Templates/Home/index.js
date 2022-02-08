// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { UserContext } from "Contexts/User";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";

// Molecules
import NoProfile from "Components/Molecules/NoProfile";

// Organisms
import Feed from "Components/Organisms/Feed";
import SearchForm from "Components/Organisms/SearchForm";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Styles
import * as S from "./style";
import ProfileRightBar from "Components/Organisms/ProfileRightBar";

// Template
const HomeTemplate = () => {
  const [approvedConnections, setApprovedConnections] = useState();
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

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  useEffect(() => {
    getApprovedConnections();
  }, [getApprovedConnections]);

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

            <ProfileRightBar profileData={profileData} />
          </Rightbar>
        </S.HomeWrapper>
      )}
    </AuthedTemplate>
  );
};

export default HomeTemplate;
