// Style
import * as S from "./style";

// Template
const Text = ({ type, children, pl }) => {
  return (
    <>
      {type === "title" && <S.Title pl={pl}>{children}</S.Title>}

      {type === "pagetitle" && <S.PageTitle pl={pl}>{children}</S.PageTitle>}

      {type === "subtitle" && <S.SubTitle pl={pl}>{children}</S.SubTitle>}

      {type === "text" && <S.Text pl={pl}>{children}</S.Text>}
    </>
  );
};

export default Text;
