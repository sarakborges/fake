// Style
import * as S from "./style";

const Avatar = ({ img, size, bgColor, isBlured }) => {
  return (
    <S.AvatarWrapper size={size}>
      <S.Avatar bgColor={bgColor} img={img} isBlured={isBlured} />
    </S.AvatarWrapper>
  );
};

export default Avatar;
