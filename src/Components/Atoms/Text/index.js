// Style
import * as S from "./style";

// Template
const Text = ({ type, children, ...rest }) => {
  return (
    <>
      {type === "title" && <S.Title {...rest}>{children}</S.Title>}

      {type === "pagetitle" && <S.PageTitle {...rest}>{children}</S.PageTitle>}

      {type === "subtitle" && <S.SubTitle {...rest}>{children}</S.SubTitle>}

      {type === "text" || (!type && <S.Text {...rest}>{children}</S.Text>)}
    </>
  );
};

export default Text;
