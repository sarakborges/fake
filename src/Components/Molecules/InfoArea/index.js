// Dependencies
import { faLink, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Contexsts
import { AppContext } from "Contexts/App";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Style
import * as S from "./style";
import { useContext } from "react";

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

  const Content = () => {
    return (
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

          {displayTags &&
            info?.publicTags?.length > 0 &&
            info?.privateTags?.length > 0 && (
              <S.TagsList>
                {info?.publicTags?.length > 0 &&
                  info?.privateTags?.length > 0 &&
                  [...info?.publicTags, info?.privateTags].map((item) => {
                    return <S.TagItem key={item}>{item}</S.TagItem>;
                  })}

                {!info?.privateTags?.length &&
                  info?.publicTags?.length > 0 &&
                  [...info?.publicTags].map((item) => {
                    return <S.TagItem key={item}>{item}</S.TagItem>;
                  })}

                {!info?.publicTags?.length &&
                  info?.privateTags?.length > 0 &&
                  [info?.privateTags].map((item) => {
                    return <S.TagItem key={item}>{item}</S.TagItem>;
                  })}
              </S.TagsList>
            )}
        </S.TextWrapper>

        {hasLink && (
          <S.Link>
            <FontAwesomeIcon icon={faLink} />
          </S.Link>
        )}
      </S.InfoArea>
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
