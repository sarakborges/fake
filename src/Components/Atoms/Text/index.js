// Style
import * as S from "./style";

// Template
const Text = ({ type, children, pl, pb }) => {
  return (
    <>
      {type === "title" && (
        <S.Title pl={pl} pb={pb}>
          {children}
        </S.Title>
      )}

      {type === "pagetitle" && (
        <S.PageTitle pl={pl} pb={pb}>
          {children}
        </S.PageTitle>
      )}

      {type === "subtitle" && (
        <S.SubTitle pl={pl} pb={pb}>
          {children}
        </S.SubTitle>
      )}

      {type === "text" ||
        (!type && (
          <S.Text pl={pl} pb={pb}>
            {children}
          </S.Text>
        ))}
    </>
  );
};

export default Text;
