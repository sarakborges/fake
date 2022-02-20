// Contexts
import { ProfileProvider } from "Contexts/Profile";

// Templates
import ProfileFeedTemplate from "Components/Templates/ProfileFeed";

// Template
const ProfileFeedPage = () => {
  return (
    <ProfileProvider>
      <ProfileFeedTemplate />
    </ProfileProvider>
  );
};

export default ProfileFeedPage;
