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

const JoinGroupButton = () => {
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
            ? [...profile.groups, { ...groupState }]
            : [{ ...groupState }],
      },
    });

    groupDispatch({
      type: "SET_GROUP",
      data: {
        ...req.group,
      },
    });
  };

  const handleClick = async () => {
    try {
      appDispatch({
        type: "SET_IS_REQUESTING",
        data: true,
      });

      const joinReq = await GroupAPI.joinGroup({
        profile: profile._id,
        group: groupState._id,
      });

      updateUsers(joinReq);

      appDispatch({
        type: "SET_IS_REQUESTING",
        data: false,
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.success,
          text: TOASTS.JOIN_GROUP.success,
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
          text: TOASTS.JOIN_GROUP.error,
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
      Participar
    </Button>
  );
};

export default JoinGroupButton;
