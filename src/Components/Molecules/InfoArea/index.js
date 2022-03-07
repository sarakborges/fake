// Dependencies
import { useContext, useEffect, useState } from "react";

// Contexsts
import { AppContext } from "Contexts/App";
import Text from "Components/Atoms/Text";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Style
import * as S from "./style";

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
    <S.InfoArea side={side}>
      <S.Avatar>
        <ProfilePicture avatar={info?.avatar} size={40} />
      </S.Avatar>

      <S.TextWrapper>
        <S.Text>
          <Text type='custom' fc='white' fs={16} fw={400}>
            {info?.name || "Não encontrado"}
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
      </S.TextWrapper>
    </S.InfoArea>
  );
};

export default InfoArea;
