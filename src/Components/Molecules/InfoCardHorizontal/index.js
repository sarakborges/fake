// Dependencies
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { faLink, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
const InfoCard = ({ info, type }) => {
  const { userState } = useContext(UserContext);
  const { profile } = userState;

  const [tags, setTags] = useState([]);

  const link = (type === "profile" ? ROUTES.PROFILE : ROUTES.GROUP).replace(
    ":id",
    info?.url
  );

  useEffect(() => {
    let newTags = [];

    if (info?.publicTags) {
      newTags = [...newTags, ...info?.publicTags];
    }

    newTags.sort((a, b) => (a > b ? 1 : -1));

    setTags(newTags);
  }, []);

  return (
    <S.InfoCard>
      <S.CardContent>
        <Link href={link}>
          <a>
            {info?.icon || !info?.avatar ? (
              <RoundIcon
                icon={info?.icon || faQuestion}
                size={64}
                bgColor='main'
              />
            ) : (
              <Avatar img={info?.avatar} size={64} bgColor='main' />
            )}
          </a>
        </Link>

        <S.TextWrapper>
          <Text type='custom' fw={600} lh={1.4}>
            <Link href={link}>
              <a>{info?.name}</a>
            </Link>
          </Text>

          <Text type='custom' lh={1.4} pt={4}>{`@${info?.url}`}</Text>

          <Text type='custom' fs={12} pt={8}>
            Criado em: {getTimeString(info?.createdAt)}
          </Text>
        </S.TextWrapper>

        <S.CardButtons>
          <Link href={link}>
            <a>
              <FontAwesomeIcon icon={faLink} />
              <span>Ver {type === "profile" ? "perfil" : "grupo"}</span>
            </a>
          </Link>
        </S.CardButtons>
      </S.CardContent>

      {tags?.length > 0 && (
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
      )}
    </S.InfoCard>
  );
};

export default InfoCard;
