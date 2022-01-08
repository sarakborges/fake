// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

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

  const displayToast = (toast) => {
    const toasts = {
      selectProfileSuccess: {
        title: "Sucesso!",
        text: `Perfil selecionado com sucesso.`,
        type: "success",
      },

      selectProfileError: {
        title: "Erro!",
        text: "Aconteceu algum erro ao trocar de perfil. Tente novamente.",
        type: "error",
      },
    };

    appDispatch({
      type: "SET_TOAST",
      data: {
        ...toasts[toast],
        isVisible: true,
      },
    });

    setTimeout(() => {
      appDispatch({
        type: "TOGGLE_TOAST",
        data: false,
      });
    }, 5000);
  };

  const handleProfileChange = async (newProfile) => {
    try {
      userDispatch({
        type: "SET_ACTIVE_PROFILE",
        data: { ...newProfile },
      });

      displayToast("selectProfileSuccess");
    } catch (e) {
      displayToast("selectProfileError");
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
                notifications={getPendingConnections()}
                side='left'
                displayCounters
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
