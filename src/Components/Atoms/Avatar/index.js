// Style
import * as S from "./style";

// Template
const Avatar = ({ img, size, isPreview, bgColor }) => {
  return (
    <S.Avatar
      bgColor={bgColor}
      img={
        !isPreview
          ? `${process.env.NEXT_PUBLIC_REQUEST_URI}/uploads/${img}`
          : img
      }
      size={size}
    />
  );
};

export default Avatar;
