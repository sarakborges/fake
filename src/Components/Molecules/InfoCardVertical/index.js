// Dependencies
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { faLink, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";
import { getTimeString } from "Helpers/Functions";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

// Template
const InfoCard = ({ info, type, isBlured }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const [tags, setTags] = useState([]);

  const link = (
    type === "profile" || type === "member" || type === "connection"
      ? ROUTES.PROFILE
      : ROUTES.GROUP
  ).replace(":id", info?.url);

  useEffect(() => {
    let newTags = [];

    if (info?.publicTags) {
      newTags = [...newTags, ...info?.publicTags];
    }

    newTags.sort((a, b) => (a > b ? 1 : -1));

    setTags(newTags);
  }, []);

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
                <Avatar
                  img={info?.avatar}
                  size={96}
                  bgColor='main'
                  isBlured={isBlured}
                />
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

          <Text
            type='subtitle'
            pt={12}
            pb={16}
            ta='center'
          >{`@${info?.url}`}</Text>

          {type === "member" && (
            <Text type='custom' fs={12} pt={16}>
              Participa desde: {getTimeString(info?.joinedAt)}
            </Text>
          )}

          {type === "connection" && (
            <Text type='custom' fs={12} pt={16}>
              Conexão desde: {getTimeString(info?.connectedAt)}
            </Text>
          )}

          {(type === "group" ||
            type === "profile" ||
            type === "connection") && (
            <Text type='custom' fs={12} pt={16}>
              Criado em: {getTimeString(info?.createdAt)}
            </Text>
          )}
        </S.TextWrapper>

        <S.TagsList>
          {tags.map((item) => {
            return (
              <Link key={item} href={ROUTES.SEARCH.replace(":str", item)}>
                <a>
                  <S.TagItem
                    isCommon={
                      profile?.publicTags?.includes(item) ||
                      profile?.privateTags?.includes(item)
                    }
                  >
                    {item}
                  </S.TagItem>
                </a>
              </Link>
            );
          })}
        </S.TagsList>

        <S.CardButtons>
          <Link href={link}>
            <a>
              <FontAwesomeIcon icon={faLink} />
              <span>
                Visitar{" "}
                {type === "profile" ||
                type === "member" ||
                type === "connection"
                  ? "perfil"
                  : "grupo"}
              </span>
            </a>
          </Link>
        </S.CardButtons>
      </S.InfoCard>
    </>
  );
};

export default InfoCard;
