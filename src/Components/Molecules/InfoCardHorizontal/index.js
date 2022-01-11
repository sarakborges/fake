// Dependencies
import Link from "next/link";
import { faLink, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Helpers
import { ROUTES } from "Helpers/routes";
import { getTimeString } from "Helpers/Functions";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

// Template
const InfoCard = ({ info, type }) => {
  const link = (type === "profile" ? ROUTES.PROFILE : ROUTES.GROUP).replace(
    ":id",
    info?.url
  );

  return (
    <>
      <S.InfoCard>
        <S.CardBar />

        <S.CardContent>
          <Link href={link}>
            <a>
              {info?.icon || !info?.avatar ? (
                <RoundIcon
                  icon={info?.icon || faQuestion}
                  size={76}
                  bgColor='main'
                />
              ) : (
                <Avatar img={info?.avatar} size={76} bgColor='main' />
              )}
            </a>
          </Link>

          <S.TextWrapper>
            <Link href={link}>
              <a>
                <Text type='title'>{info?.name}</Text>
              </a>
            </Link>

            <Text type='subtitle' pt={8}>{`@${info?.url}`}</Text>

            {type === "group" && (
              <Text type='custom' fs={12} pt={16}>
                Criado em: {getTimeString(new Date())}
              </Text>
            )}

            {type === "profile" && (
              <Text type='custom' fs={12} pt={16}>
                Participa desde: {getTimeString(new Date())}
              </Text>
            )}
          </S.TextWrapper>

          <S.CardButtons>
            <Link href={link}>
              <a>
                <FontAwesomeIcon icon={faLink} />
                <span>Visitar {type === "profile" ? "perfil" : "grupo"}</span>
              </a>
            </Link>
          </S.CardButtons>
        </S.CardContent>
      </S.InfoCard>
    </>
  );
};

export default InfoCard;
