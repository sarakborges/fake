// Dependencies
import Head from "next/head";
import { useContext } from "react";

// Helpers
import { SITE_NAME } from "Helpers/Constants";

// Contexts
import { ProfileContext } from "Contexts/Profile";

// Atoms
import InfoAbout from "Components/Atoms/InfoAbout";

// Template
import ProfileTemplate from "Components/Templates/Profile";

// Template
const ProfileAboutTemplate = () => {
  const { profileState } = useContext(ProfileContext);

  return (
    <ProfileTemplate>
      <Head>
        <title>{`${SITE_NAME} - ${profileState?.name || "Perfil"}`}</title>
      </Head>

      <InfoAbout isAdult={profileState?.isAdult} about={profileState?.about} />
    </ProfileTemplate>
  );
};

export default ProfileAboutTemplate;
