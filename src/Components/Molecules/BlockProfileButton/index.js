// Dependencies
import { useContext } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { displayToast } from "Helpers/Functions";
import { TOASTS } from "Helpers/Constants";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";
import { ProfileContext } from "Contexts/Profile";

// Atoms
import Button from "Components/Atoms/Button";

const BlockProfileButton = ({ isRequesting, setIsRequesting }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { profile } = userState;

  const { profileState } = useContext(ProfileContext);
  const { appDispatch } = useContext(AppContext);

  const handleClick = async () => {
    try {
      setIsRequesting(true);

      const newProfile = {
        ...profile,

        blockedUsers:
          profile?.blockedUsers?.length > 0
            ? [...profile.blockedUsers, profileState._id]
            : [profileState._id],
      };

      await ProfileAPI.blockProfile({
        ids: [profile._id, profileState._id],
        status: "blocked",
      });

      await ProfileAPI.updateConnection({
        ids: [profile._id, profileState._id],
        status: "remove",
      });

      userDispatch({
        type: "SET_ACTIVE_PROFILE",
        data: {
          ...newProfile,
        },
      });

      setIsRequesting(false);
      displayToast(TOASTS.BLOCK, 0, appDispatch);
    } catch (e) {
      setIsRequesting(false);
      displayToast(TOASTS.BLOCK, 1, appDispatch);
      console.log(e);
    }
  };

  return (
    <Button
      style='primary'
      size={14}
      onClick={handleClick}
      disabled={isRequesting}
    >
      Bloquear
    </Button>
  );
};

export default BlockProfileButton;
