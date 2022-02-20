// Contexts
import { ProfileProvider } from "Contexts/Profile";

// Templates
import ProfileConnectionsTemplate from "Components/Templates/ProfileConnections";

// Template
const ProfileConnectionsPage = () => {
  return (
    <ProfileProvider>
      <ProfileConnectionsTemplate />
    </ProfileProvider>
  );
};

export default ProfileConnectionsPage;
