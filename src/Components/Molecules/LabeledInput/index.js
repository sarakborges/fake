// Atoms
import Input from "Components/Atoms/Input";

// Style
import * as S from "./style";

// Template
const LabeledInput = ({ id, type, placeholder, label, value, onChange }) => {
  return (
    <S.Wrapper>
      <Input
        id={id}
        type={type || "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      <S.Label htmlFor={id}>{label}</S.Label>
    </S.Wrapper>
  );
};

export default LabeledInput;
