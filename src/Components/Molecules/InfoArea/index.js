// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import ProfilePicture from "Components/Molecules/ProfilePicture";

// Style
import * as S from "./style";

const InfoArea = ({
  info,
  side,
  displayCounters,
  displayUrl,
  notifications,
  messages,
  avatarSize,
}) => {
  const { appState } = useContext(AppContext);
  const { displayAdult } = appState;

  return (
    <S.InfoArea side={side}>
      <S.Avatar>
        <ProfilePicture avatar={info?.avatar} size={avatarSize || 40} />
      </S.Avatar>

      <S.TextWrapper>
        <S.Text>
          <Text type='custom' fc='white' fs={16} fw={400}>
            {info?.name || "Não encontrado"}
          </Text>

          {displayUrl && (
            <Text type='custom' fc='bgInverted' fs={12} fw={400}>
              @{info?.url || "Não encontrado"}
            </Text>
          )}
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
