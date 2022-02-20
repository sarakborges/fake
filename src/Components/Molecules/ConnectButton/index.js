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

const ConnectButton = ({ isRequesting, setIsRequesting }) => {
  const { userState, userDispatch } = useContext(UserContext);
  const { profile } = userState;

  const { profileState, profileDispatch } = useContext(ProfileContext);
  const { appDispatch } = useContext(AppContext);

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
      setIsRequesting(true);

      const createConnectinoReq = await ProfileAPI.createConnection({
        ids: [profile._id, profileState._id],
      });

      updateUsers(createConnectinoReq);

      setIsRequesting(false);
      displayToast(TOASTS.CONNECT, 0, appDispatch);
    } catch (e) {
      console.log(e);
      setIsRequesting(false);
      displayToast(TOASTS.CONNECT, 1, appDispatch);
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
