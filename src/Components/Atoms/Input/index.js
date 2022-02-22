// Style
import * as S from "./style";

const Input = ({
  id,
  type,
  placeholder,
  value,
  error,
  onChange,
  onFocus,
  onBlur,
  disabled,
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
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
    </>
  );
};

export default Input;
