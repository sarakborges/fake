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

const AcceptConnectionButton = ({ children, profileId }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { profile } = userState;

  const { profileState, profileDispatch } = useContext(ProfileContext);
  const { appState, appDispatch } = useContext(AppContext);
  const { isRequesting } = appState;

  const updateUsers = (req) => {
    const newLocalProfile = req.find((item) => item._id === profile._id);
    userDispatch({
      type: "SET_ACTIVE_PROFILE",
      data: {
        ...newLocalProfile,
      },
    });

    if (!profileState?._id) {
      return;
    }

    const newParentProfile = req.find((item) => item._id === profileState._id);
    profileDispatch({
      type: "SET_PROFILE",
      data: {
        ...newParentProfile,
      },
    });
  };

  const handleClick = async () => {
    try {
      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      const updateConnectinoReq = await ProfileAPI.updateConnection({
        ids: [profile._id, profileId || profileState?._id],
        status: "accept",
      });

      updateUsers(updateConnectinoReq);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      displayToast(TOASTS.ACCEPT_CONNECTION, 0, appDispatch);
    } catch (e) {
      console.log(e);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      displayToast(TOASTS.ACCEPT_CONNECTION, 1, appDispatch);
    }
  };

  return (
    <Button
      style='primary'
      size={14}
      onClick={handleClick}
      disabled={isRequesting}
    >
      {children}
    </Button>
  );
};

export default AcceptConnectionButton;
