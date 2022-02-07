// Dependencies
import { useContext, useEffect, useState } from "react";
import { faLink, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Style
import * as S from "./style";

// Template
const InfoArea = ({
  info,
  side,
  hasLink,
  displayCounters,
  displayTags,
  notifications,
  messages,
  isBox,
  avatarSize,
  infoGap,
  squaredBox,
  isBgContrast,
}) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  const [tags, setTags] = useState([]);

  useEffect(() => {
    let newTags = [];

    if (info?.privateTags) {
      newTags = [...newTags, ...info?.privateTags];
    }

    if (info?.publicTags) {
      newTags = [...newTags, ...info?.publicTags];
    }

    newTags.sort((a, b) => (a > b ? 1 : -1));

    setTags(newTags);
  }, [info]);

  const Content = () => {
    return (
      <>
        <S.InfoArea side={side} infoGap={infoGap}>
          {info?.icon || !info?.avatar ? (
            <RoundIcon
              icon={info?.icon || faQuestion}
              size={avatarSize || 48}
              bgColor='main'
            />
          ) : (
            <Avatar
              img={info?.avatar}
              size={avatarSize || 48}
              bgColor='main'
              isBlured={info?.isAdult && !displayAdult}
            />
          )}

          <S.TextWrapper>
            <S.Text>
              <S.Name>{info?.name || "Não encontrado"}</S.Name>
              <S.Url>{info?.url ? `@${info?.url}` : ""}</S.Url>
            </S.Text>

            {displayCounters && (
              <S.CounterList>
                <S.Counter>
                  <S.CounterIcon>{notifications}</S.CounterIcon>
                  <>{notifications === 1 ? "Notificação" : "Notificações"}</>
                </S.Counter>

                <S.Counter>
                  <S.CounterIcon>{messages}</S.CounterIcon>
                  <>{messages === 1 ? "Mensagem" : "Mensagens"}</>
                </S.Counter>
              </S.CounterList>
            )}
          </S.TextWrapper>

          {hasLink && (
            <S.Link>
              <FontAwesomeIcon icon={faLink} />
            </S.Link>
          )}
        </S.InfoArea>

        {displayTags && tags?.length > 0 && (
          <S.TagsList>
            {tags.map((item) => {
              return <S.TagItem key={item}>{item}</S.TagItem>;
            })}
          </S.TagsList>
        )}
      </>
    );
  };

  return isBox ? (
    <S.InfoAreaBox squaredBox={squaredBox} isBgContrast={isBgContrast}>
      <Content />
    </S.InfoAreaBox>
  ) : (
    <Content />
  );
};

export default InfoArea;
