// Dependencies
import { useContext } from "react";

// Contexsts
import { AppContext } from "Contexts/App";

// Molecules
import InfoCard from "Components/Molecules/InfoCardVertical";

// Style
import * as S from "./style";

const InfoList = ({ info, type, parentInfo }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return (
    <S.InfoList>
      {info?.length &&
        info.map((item) => {
          return (
            <li key={item?.url}>
              <InfoCard
                info={item}
                type={type}
                isBlured={item.isAdult && !displayAdult}
                parentInfo={parentInfo}
              />
            </li>
          );
        })}
    </S.InfoList>
  );
};

export default InfoList;
