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

const UnblockProfileButton = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { profile } = userState;

  const { profileState } = useContext(ProfileContext);
  const { appState, appDispatch } = useContext(AppContext);
  const { isRequesting } = appState;

  const handleClick = async () => {
    try {
      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      const newProfile = {
        ...profile,

        blockedUsers:
          profile?.blockedUsers?.length > 0
            ? [
                ...profile.blockedUsers.filter(
                  (item) => item !== profileState._id
                ),
              ]
            : [],
      };

      await ProfileAPI.blockProfile({
        ids: [profile._id, profileState._id],
        status: "unblocked",
      });

      userDispatch({
        type: "SET_ACTIVE_PROFILE",
        data: {
          ...newProfile,
        },
      });

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      displayToast(TOASTS.UNBLOCK, 0, appDispatch);
    } catch (e) {
      console.log(e);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      displayToast(TOASTS.UNBLOCK, 0, appDispatch);
    }
  };

  return (
    <Button
      style='primary'
      size={14}
      onClick={handleClick}
      disabled={isRequesting}
    >
      Desbloquear
    </Button>
  );
};

export default UnblockProfileButton;
