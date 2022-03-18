// Dependencies
import { useState, useContext, useEffect } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Helpers
import { TOASTS, TOAST_TYPES } from "Helpers/Constants";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";

const SelectProfilesList = ({ profiles }) => {
  const { userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);

  const [profilesList, setProfilesList] = useState();

  const getPendingConnections = (profile) => {
    return (
      profile?.connections
        ?.filter?.((item) => {
          if (item.status === "pending") {
            return item;
          } else {
            return false;
          }
        })
        .map((item) => {
          return { connectionRequest: { ...item } };
        }) || []
    ).length;
  };

  const handleProfileChange = async (newProfile) => {
    try {
      const fullProfile = await ProfileAPI.getProfileById(newProfile._id);

      userDispatch({
        type: "SET_ACTIVE_PROFILE",
        data: { ...fullProfile },
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.success,
          text: TOASTS.SELECT_PROFILE.success,
          isVisible: true,
        },
      });
    } catch (e) {
      console.log(e);

      appDispatch({
        type: "SET_TOAST",
        data: {
          ...TOAST_TYPES.error,
          text: TOASTS.SELECT_PROFILE.error,
          isVisible: true,
        },
      });
    }
  };

  useEffect(() => {
    if (!profiles?.length) {
      return;
    }

    setProfilesList(
      profiles.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
    );
  }, [profiles]);

  return (
    <S.ProfilesList>
      {profilesList?.length > 0 &&
        profilesList.map((item) => {
          return (
            <li
              key={item.url}
              onClick={() => {
                handleProfileChange(item);
              }}
            >
              <InfoArea
                info={item}
                avatarSize={48}
                messages={0}
                notifications={getPendingConnections(item)}
                side='left'
                displayCounters
                displayTags
              />
            </li>
          );
        })}
    </S.ProfilesList>
  );
};

export default SelectProfilesList;
