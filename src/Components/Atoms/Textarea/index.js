// Style
import * as S from "./style";

// Template
const Textarea = ({ id, placeholder, value, onChange, size }) => {
  return (
    <S.Textarea
      id={id}
      name={id}
      size={size}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
