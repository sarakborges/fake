// Dependencies
import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { SITE_NAME } from "Helpers/Constants";
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Rightbar from "Components/Atoms/Rightbar";
import InfoAbout from "Components/Atoms/InfoAbout";

// Molecules
import InfoNotFound from "Components/Molecules/InfoNotFound";

// Organisms
import InfoHeader from "Components/Organisms/InfoHeader";
import RoundList from "Components/Organisms/RoundList";
import TagsList from "Components/Organisms/TagsList";

// Template
import AuthedTemplate from "Components/Templates/Authed";

// Style
import * as S from "./style";

// Template
const ProfileTemplate = () => {
  const [profileData, setProfileData] = useState();
  const [approvedConnections, setApprovedConnections] = useState([]);
  const [approvedMemberships, setApprovedMemberships] = useState([]);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const router = useRouter();
  const {
    query: { url },
  } = router;

  const getProfile = useCallback(
    async (profileUrl) => {
      const profileReq = await ProfileAPI.getProfileByUrl(profileUrl);

      if (profileReq) {
        setProfileData(profileReq);
      }
    },
    [ProfileAPI]
  );

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
          (groupItem) => groupItem.profile === profileData?._id
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
    getProfile(url);
  }, [url, getProfile]);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [getApprovedConnections, getApprovedMemberships]);

  return (
    <AuthedTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${profileData?.name || "Perfil"}`}</title>
      </Head>

      {(!profileData?._id ||
        profileData?.blockedUsers?.includes?.(profile?._id)) && (
        <InfoNotFound type='profile' />
      )}

      {profileData?._id &&
        !profileData?.blockedUsers?.includes?.(profile?._id) && (
          <>
            <S.ProfileWrapper>
              <InfoHeader
                info={profileData}
                type='profile'
                setInfo={setProfileData}
              />

              <S.ProfileBody>
                <S.ProfileLeft>
                  <InfoAbout
                    isAdult={profileData.isAdult}
                    about={profileData.about}
                  />
                </S.ProfileLeft>

                <Rightbar>
                  <RoundList
                    type='profile'
                    title='Conexões'
                    emptyTitle={`${
                      profile?._id === profileData._id
                        ? "Você"
                        : profileData.name
                    } ainda não possui conexões.`}
                    list={approvedConnections
                      ?.slice?.(0, 5)
                      .map((item) => item.user)}
                    extraItemLink={ROUTES.PROFILE_CONNECTIONS.replace(
                      ":id",
                      profileData.url
                    )}
                    displayMore={approvedConnections?.length > 5}
                  />

                  <RoundList
                    type='group'
                    title='Grupos'
                    emptyTitle={`${
                      profile?._id === profileData._id
                        ? "Você"
                        : profileData.name
                    } ainda não participa de grupos.`}
                    list={approvedMemberships?.slice?.(0, 5)}
                    extraItemLink={ROUTES.GROUP_MEMBERS.MEMBERS.replace(
                      ":id",
                      profileData.url
                    )}
                    displayMore={approvedMemberships?.length > 5}
                  />

                  {profileData?.publicTags?.length > 0 && (
                    <TagsList
                      title='Tags'
                      list={[...profileData?.publicTags]}
                      hideEmpty
                    />
                  )}
                </Rightbar>
              </S.ProfileBody>
            </S.ProfileWrapper>
          </>
        )}
    </AuthedTemplate>
  );
};

export default ProfileTemplate;
