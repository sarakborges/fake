// Dependencies
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Style
import * as S from "./style";

// Template
const DetailedInfoArea = ({ info, side, isBox, highlighted }) => {
  const getPendingConnections = () => {
    return (
      info?.connections
        ?.filter?.((item) => {
          if (item.status === "pending") {
            return item;
          } else {
            return false;
          }
        })
        .map((item) => {
          return { connectionRequest: { ...item } };
        }) || []
    ).length;
  };

  const AvatarWrapper = () => {
    return (
      <>
        {info?.icon || !info?.avatar ? (
          <RoundIcon icon={info?.icon || faQuestion} size={64} bgColor='main' />
        ) : (
          <Avatar img={info?.avatar} size={64} bgColor='main' />
        )}
      </>
    );
  };

  const Content = () => {
    return (
      <S.InfoArea>
        {side === "left" && <AvatarWrapper />}

        <S.TextWrapper>
          <S.Text>
            <S.Name>{info?.name || "Não encontrado"}</S.Name>
            <S.Url>{info?.url ? `@${info?.url}` : ""}</S.Url>
          </S.Text>

          <S.CounterList>
            <S.Counter>
              <S.CounterIcon>{getPendingConnections()}</S.CounterIcon>
              <>
                {getPendingConnections() === 1 ? "Notificação" : "Notificações"}
              </>
            </S.Counter>

            <S.Counter>
              <S.CounterIcon>0</S.CounterIcon>
              <>Mensagens</>
            </S.Counter>
          </S.CounterList>
        </S.TextWrapper>

        {(!side || side === "right") && <AvatarWrapper />}
      </S.InfoArea>
    );
  };

  return isBox ? (
    <S.InfoAreaBox highlighted={highlighted}>
      <Content />
    </S.InfoAreaBox>
  ) : (
    <Content />
  );
};

export default DetailedInfoArea;
