// Molecules
import InfoCard from "Components/Molecules/InfoCardVertical";

// Style
import * as S from "./style";

// Template
const InfoList = ({ info, type }) => {
  return (
    <S.InfoList>
      {info &&
        info.map((item) => {
          return (
            <li key={item?.url}>
              <InfoCard info={item} type={type} />
            </li>
          );
        })}
    </S.InfoList>
  );
};

export default InfoList;
