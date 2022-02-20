// Contexts
import { ProfileProvider } from "Contexts/Profile";

// Templates
import ProfileAboutTemplate from "Components/Templates/ProfileAbout";

// Template
const ProfileAboutPage = () => {
  return (
    <ProfileProvider>
      <ProfileAboutTemplate />
    </ProfileProvider>
  );
};

export default ProfileAboutPage;
