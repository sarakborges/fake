// Style
import * as S from "./style";

// Template
const Button = ({ children, type, disabled, style, size, onClick }) => {
  return (
    <S.Button
      buttonStyle={style}
      disabled={disabled}
      type={type || "button"}
      size={size}
      onClick={onClick}
    >
      {children}
    </S.Button>
  );
};

export default Button;
