// Dependencies
import { useContext, useEffect, useState } from "react";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import InfoCard from "Components/Molecules/InfoCardVertical";

// Style
import * as S from "./style";

const InfoList = ({ info, type, parentInfo }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  const [infoList, setInfoList] = useState();

  useEffect(() => {
    if (!info?.length) {
      return;
    }

    setInfoList(
      info.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      )
    );
  }, [info]);

  return (
    <S.InfoList>
      {infoList?.length > 0 ? (
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
        })
      ) : (
        <Text>Nenhum resultado encontrado</Text>
      )}
    </S.InfoList>
  );
};

export default InfoList;
