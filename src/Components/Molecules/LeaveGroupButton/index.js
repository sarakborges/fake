// Dependencies
import { useContext } from "react";

// APIs
import GroupAPI from "Apis/Group";

// Helpers
import { TOASTS, TOAST_TYPES } from "Helpers/Constants";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";
import { GroupContext } from "Contexts/Group";

// Atoms
import Button from "Components/Atoms/Button";

const LeaveGroupButton = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { profile } = userState;

  const { groupState, groupDispatch } = useContext(GroupContext);
  const { appState, appDispatch } = useContext(AppContext);
  const { isRequesting } = appState;

  const updateUsers = (req) => {
    userDispatch({
      type: "SET_ACTIVE_PROFILE",
      data: {
        ...profile,

        groups:
          profile?.groups?.length > 0
            ? [...profile.groups.filter((item) => item !== groupState._id)]
            : [],
      },
    });

    groupDispatch({
      type: "SET_GROUP",
      data: {
        ...req,
      },
    });
  };

  const handleClick = async () => {
    try {
      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      const leaveReq = await GroupAPI.leaveGroup({
        profile: profile._id,
        group: groupState._id,
      });

      updateUsers(leaveReq);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.success,
          text: TOASTS.LEAVE_GROUP.success,
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
          text: TOASTS.LEAVE_GROUP.error,
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
      Deixar de participar
    </Button>
  );
};

export default LeaveGroupButton;
