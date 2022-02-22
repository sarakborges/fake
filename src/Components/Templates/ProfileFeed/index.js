// Dependencies
import { useContext } from "react";

// Contexts
import { ProfileContext } from "Contexts/Profile";

// Organisms
import Feed from "Components/Organisms/Feed";

// Templates
import ProfileTemplate from "Components/Templates/Profile";

// Styles
import * as S from "./style";

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
