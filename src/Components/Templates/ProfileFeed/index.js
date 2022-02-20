// Dependencies
import { useContext } from "react";

// Contexts
import { ProfileContext } from "Contexts/Profile";

// Organisms
import Feed from "Components/Organisms/Feed";

// Template
import ProfileTemplate from "Components/Templates/Profile";

// Styles
import * as S from "./style";

// Template
const ProfileFeedTemplate = () => {
  const { profileState } = useContext(ProfileContext);

  return (
    <ProfileTemplate>
      <S.ProfileFeed>
        <Feed profile={profileState} />
      </S.ProfileFeed>
    </ProfileTemplate>
  );
};

export default ProfileFeedTemplate;
