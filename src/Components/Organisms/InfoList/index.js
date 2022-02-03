// Dependencies
import { useContext } from "react";

// Contexsts
import { AppContext } from "Contexts/App";

// Molecules
import InfoCard from "Components/Molecules/InfoCardVertical";

// Style
import * as S from "./style";

// Template
const InfoList = ({ info, type }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return (
    <S.InfoList>
      {info &&
        info.map((item) => {
          return (
            <li key={item?.url}>
              <InfoCard
                info={item}
                type={type}
                isBlured={item.isAdult && !displayAdult}
              />
            </li>
          );
        })}
    </S.InfoList>
  );
};

export default InfoList;
