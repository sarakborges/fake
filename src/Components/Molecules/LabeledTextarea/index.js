// Atoms
import Textarea from "Components/Atoms/Textarea";

// Style
import * as S from "./style";

const LabeledTextarea = ({
  id,
  size,
  placeholder,
  label,
  value,
  onChange,
  isBgContrast,
}) => {
  return (
    <S.Wrapper>
      <Textarea
        id={id}
        placeholder={placeholder}
        size={size}
        value={value}
        onChange={onChange}
        isBgContrast={isBgContrast}
      />

      <S.Label htmlFor={id}>{label}</S.Label>
    </S.Wrapper>
  );
};

export default LabeledTextarea;
