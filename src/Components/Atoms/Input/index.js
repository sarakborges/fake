// Style
import * as S from "./style";

// Template
const Input = ({
  id,
  type,
  placeholder,
  value,
  error,
  onChange,
  isBgContrast,
}) => {
  return (
    <>
      {error && <S.Error>{error}</S.Error>}

      <S.Input
        id={id}
        name={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        isBgContrast={isBgContrast}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
