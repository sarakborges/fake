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
const SelectProfilesList = ({ profiles, activeProfile }) => {
  const { userDispatch } = useContext(UserContext);
  const { appDispatch } = useContext(AppContext);

  const handleProfileChange = (newProfile) => {
    try {
      userDispatch({
        type: "SET_ACTIVE_PROFILE",
        data: profiles.find((item) => item._id === newProfile._id),
      });

      appDispatch({
        type: "SET_TOAST",
        data: {
          title: "Sucesso!",
          text: `Perfil "${newProfile.name}" selecionado com sucesso.`,
          type: "success",
          isVisible: true,
        },
      });

      setTimeout(() => {
        appDispatch({
          type: "TOGGLE_TOAST",
          data: false,
        });
      }, 5000);
    } catch (e) {
      appDispatch({
        type: "SET_TOAST",
        data: {
          title: "Erro!",
          text: "Aconteceu algum erro ao trocar de perfil. Tente novamente.",
          type: "error",
          isVisible: true,
        },
      });

      setTimeout(() => {
        appDispatch({
          type: "TOGGLE_TOAST",
          data: false,
        });
      }, 5000);
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
                if (handleProfileChange && item._id !== activeProfile) {
                  handleProfileChange(item);
                }
              }}
            >
              <InfoArea
                info={item}
                isBox
                highlighted={item._id === activeProfile}
              />
            </li>
          );
        })}
    </S.ProfilesList>
  );
};

export default SelectProfilesList;
