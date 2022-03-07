// Dependencies
import { useContext } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Helpers
import { TOASTS, TOAST_TYPES } from "Helpers/Constants";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";
import { ProfileContext } from "Contexts/Profile";

// Atoms
import Button from "Components/Atoms/Button";

const ConnectButton = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { profile } = userState;

  const { profileState, profileDispatch } = useContext(ProfileContext);
  const { appState, appDispatch } = useContext(AppContext);
  const { isRequesting } = appState;

  const updateUsers = (req) => {
    const newLocalProfile = req.find((item) => item._id === profile._id);
    const newParentProfile = req.find((item) => item._id === profileState._id);

    userDispatch({
      type: "SET_ACTIVE_PROFILE",
      data: {
        ...newLocalProfile,
      },
    });

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

      const createConnectinoReq = await ProfileAPI.createConnection({
        ids: [profile._id, profileState._id],
      });

      updateUsers(createConnectinoReq);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.success,
          text: TOASTS.CONNECT.success,
          isVisible: true,
        },
      });
    } catch (e) {
      console.log(e);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.error,
          text: TOASTS.CONNECT.error,
          isVisible: true,
        },
      });
    }
  };

  return (
    <Button
      style='primary'
      size={14}
      onClick={handleClick}
      disabled={isRequesting}
    >
      Conectar-se
    </Button>
  );
};

export default ConnectButton;
