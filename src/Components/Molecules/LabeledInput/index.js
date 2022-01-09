// Atoms
import Input from "Components/Atoms/Input";

// Style
import * as S from "./style";

// Template
const LabeledInput = ({
  id,
  type,
  placeholder,
  label,
  value,
  onChange,
  isBgContrast,
}) => {
  return (
    <S.Wrapper>
      <Input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        isBgContrast={isBgContrast}
        onChange={onChange}
      />

      <S.Label htmlFor={id}>{label}</S.Label>
    </S.Wrapper>
  );
};

export default LabeledInput;
