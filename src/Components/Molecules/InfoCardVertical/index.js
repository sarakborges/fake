// Dependencies
import Link from "next/link";
import { faLink, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

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
  const link = (
    type === "profile" || type === "member" ? ROUTES.PROFILE : ROUTES.GROUP
  ).replace(":id", info?.url);

  return (
    <>
      <S.InfoCard>
        <S.Avatar>
          <Link href={link}>
            <a>
              {info?.icon || !info?.avatar ? (
                <RoundIcon
                  icon={info?.icon || faQuestion}
                  size={96}
                  bgColor='main'
                />
              ) : (
                <Avatar img={info?.avatar} size={96} bgColor='main' />
              )}
            </a>
          </Link>
        </S.Avatar>

        <S.TextWrapper>
          <S.Name>
            <Link href={link}>
              <a>
                <Text type='title' ta='center'>
                  {info?.isOwner ? (
                    <S.Owner>
                      <span>{info?.name}</span>
                      <FontAwesomeIcon icon={faCrown} />
                    </S.Owner>
                  ) : info?.isModerator ? (
                    <S.Moderator>
                      <span>{info?.name}</span>
                      <FontAwesomeIcon icon={faCrown} />
                    </S.Moderator>
                  ) : (
                    info?.name
                  )}
                </Text>
              </a>
            </Link>
          </S.Name>

          <Text type='subtitle' pt={12} ta='center'>{`@${info?.url}`}</Text>

          {type === "group" && (
            <Text type='custom' fs={12} pt={16}>
              Criado em: {getTimeString(info?.createdAt)}
            </Text>
          )}

          {type === "member" && (
            <Text type='custom' fs={12} pt={16}>
              Participa desde: {getTimeString(info?.joinedAt)}
            </Text>
          )}

          {type === "profile" && (
            <Text type='custom' fs={12} pt={16}>
              Conexão desde: {getTimeString(info?.connectedAt)}
            </Text>
          )}
        </S.TextWrapper>

        <S.CardButtons>
          <Link href={link}>
            <a>
              <FontAwesomeIcon icon={faLink} />
              <span>
                Visitar{" "}
                {type === "profile" || type === "member" ? "perfil" : "grupo"}
              </span>
            </a>
          </Link>
        </S.CardButtons>
      </S.InfoCard>
    </>
  );
};

export default InfoCard;
