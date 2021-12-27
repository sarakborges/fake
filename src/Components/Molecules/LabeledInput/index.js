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
  isBgInverted,
}) => {
  return (
    <S.Wrapper>
      <Input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        isBgInverted={isBgInverted}
        onChange={onChange}
      />

      <S.Label htmlFor={id}>{label}</S.Label>
    </S.Wrapper>
  );
};

export default LabeledInput;
