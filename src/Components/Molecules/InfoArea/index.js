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
import Text from "Components/Atoms/Text";

// Template
const InfoArea = ({
  info,
  side,
  displayCounters,
  displayTags,
  notifications,
  messages,
  avatarSize,
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

  return (
    <span>
      <S.InfoArea side={side}>
        <S.Avatar>
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
        </S.Avatar>

        <span>
          <S.Text>
            <Text type='custom' fc='main' fw={600}>
              {info?.name || "Não encontrado"}
            </Text>

            <Text type='custom' fc='bgInverted'>
              {info?.url ? `@${info?.url}` : ""}
            </Text>
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
        </span>
      </S.InfoArea>

      {displayTags && tags?.length > 0 && (
        <S.TagsList>
          {tags.map((item) => {
            return <S.TagItem key={item}>{item}</S.TagItem>;
          })}
        </S.TagsList>
      )}
    </span>
  );
};

export default InfoArea;
