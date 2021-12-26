// Dependencies
import { faQuestion } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Avatar from "Components/Atoms/Avatar";
import RoundIcon from "Components/Atoms/RoundIcon";

// Style
import * as S from "./style";

// Template
const InfoArea = ({ info, side, isBox, highlighted }) => {
  const AvatarWrapper = () => {
    return (
      <>
        {info?.icon ? (
          <RoundIcon icon={info?.icon || faQuestion} size={48} bgColor='main' />
        ) : (
          <Avatar img={info?.avatar} size={48} />
        )}
      </>
    );
  };

  const Content = () => {
    return (
      <S.InfoArea>
        {side === "left" && <AvatarWrapper />}

        <S.Text>
          <S.Name>{info?.name || "Não encontrado"}</S.Name>
          <S.Url>{info?.url ? `@${info?.url}` : ""}</S.Url>
        </S.Text>

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

export default InfoArea;
