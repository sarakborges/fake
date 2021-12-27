// Dependencies
import Link from "next/link";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";
import { ROUTES } from "Helpers/routes";

// Template
const InfoList = ({ info, type }) => {
  return (
    <S.InfoList>
      {info &&
        info.map((item) => {
          return (
            <S.InfoItem key={item.url}>
              {item.url ? (
                <Link
                  href={ROUTES[type.toUpperCase()].replace(":id", item.url)}
                >
                  <a>
                    <InfoArea info={item} isBox />
                  </a>
                </Link>
              ) : (
                <InfoArea info={item} isBox />
              )}
            </S.InfoItem>
          );
        })}
    </S.InfoList>
  );
};

export default InfoList;
