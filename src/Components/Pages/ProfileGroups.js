// Contexts
import { ProfileProvider } from "Contexts/Profile";

// Templates
import ProfileGroupsTemplate from "Components/Templates/ProfileGroups";

// Template
const ProfileGroupsPage = () => {
  return (
    <ProfileProvider>
      <ProfileGroupsTemplate />
    </ProfileProvider>
  );
};

export default ProfileGroupsPage;
