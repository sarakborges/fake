// Style
import * as S from "./style";

// Template
const Input = ({ id, type, placeholder, value, onChange, isBgContrast }) => {
  return (
    <S.Input
      id={id}
      name={id}
      type={type || "text"}
      placeholder={placeholder}
      value={value}
      isBgContrast={isBgContrast}
      onChange={onChange}
    />
  );
};

export default Input;
