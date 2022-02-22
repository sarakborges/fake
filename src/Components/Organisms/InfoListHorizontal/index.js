// Dependencies
import { useContext } from "react";

// Contexsts
import { AppContext } from "Contexts/App";

// Molecules
import InfoCard from "Components/Molecules/InfoCardHorizontal";

const InfoList = ({ info, type }) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return (
    <ul>
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
    </ul>
  );
};

export default InfoList;
