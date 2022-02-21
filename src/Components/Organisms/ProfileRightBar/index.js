// Dependencies
import { useCallback, useContext, useEffect, useState } from "react";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Organisms
import RoundList from "Components/Organisms/RoundList";
import TagsList from "Components/Organisms/TagsList";

// Template
const ProfileRightBar = ({ profileData }) => {
  const [approvedConnections, setApprovedConnections] = useState([]);
  const [approvedMemberships, setApprovedMemberships] = useState([]);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

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
        if (item.status === "member") {
          return item;
        } else {
          return false;
        }
      }) || []
    );
  }, [profileData, setApprovedMemberships]);

  useEffect(() => {
    getApprovedConnections();
    getApprovedMemberships();
  }, [getApprovedConnections, getApprovedMemberships]);

  return (
    <>
      <RoundList
        type='profile'
        title='Conexões'
        emptyTitle={`${
          profile?._id === profileData._id ? "Você" : profileData.name
        } ainda não possui conexões.`}
        list={approvedConnections?.slice?.(0, 5).map((item) => item.user)}
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
          profile?._id === profileData._id ? "Você" : profileData.name
        } ainda não participa de grupos.`}
        list={approvedMemberships?.slice?.(0, 5).filter((item) => item.group)}
        extraItemLink={ROUTES.GROUP_MEMBERS.MEMBERS.replace(
          ":id",
          profileData.url
        )}
        displayMore={approvedMemberships?.length > 5}
      />

      {profileData?.publicTags?.length > 0 && (
        <TagsList title='Tags' list={[...profileData?.publicTags]} hideEmpty />
      )}
    </>
  );
};

export default ProfileRightBar;
