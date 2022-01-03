// Style
import * as S from "./style";

// Template
const InfoAbout = ({ about }) => {
  return (
    <S.About>
      <div dangerouslySetInnerHTML={{ __html: about }} />
    </S.About>
  );
};

export default InfoAbout;
