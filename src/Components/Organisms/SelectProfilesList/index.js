// Dependencies
import { useContext } from "react";

// APIs
import ProfileAPI from "Apis/Profile";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Helpers
import { displayToast } from "Helpers/Functions";
import { TOASTS } from "Helpers/Constants";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";

// Template
const SelectProfilesList = ({ profiles }) => {
  const { userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);

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

      displayToast(TOASTS.SELECT_PROFILE, 0, appDispatch);
    } catch (e) {
      console.log(e);
      displayToast(TOASTS.SELECT_PROFILE, 1, appDispatch);
    }
  };

  return (
    <S.ProfilesList>
      {profiles &&
        profiles.map((item) => {
          return (
            <li
              key={item.url}
              onClick={() => {
                handleProfileChange(item);
              }}
            >
              <InfoArea
                info={item}
                infoGap={24}
                avatarSize={64}
                messages={0}
                notifications={getPendingConnections(item)}
                side='left'
                displayCounters
                displayTags
                isBox
                squaredBox
              />
            </li>
          );
        })}
    </S.ProfilesList>
  );
};

export default SelectProfilesList;
