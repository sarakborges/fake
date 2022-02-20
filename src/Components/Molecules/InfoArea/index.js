// Dependencies
import { useContext, useEffect, useState } from "react";

// Contexsts
import { AppContext } from "Contexts/App";
import Text from "Components/Atoms/Text";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Style
import * as S from "./style";

// Template
const InfoArea = ({ info, side, displayCounters, notifications, messages }) => {
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
          <ProfilePicture avatar={info?.avatar} size={48} />
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
    </span>
  );
};

export default InfoArea;
