import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

// Style
import * as S from "./style";

// Template
const Checkbox = ({ id, label, value, onChange }) => {
  return (
    <S.CheckboxWrapper>
      <S.Label htmlFor={id}>
        <span>{label}</span>

        <input
          id={id}
          name={id}
          type='checkbox'
          value={value}
          onChange={onChange}
        />

        <S.Checkbox>
          <S.CheckboxIcon>
            <FontAwesomeIcon icon={faCheck} />
          </S.CheckboxIcon>
        </S.Checkbox>
      </S.Label>
    </S.CheckboxWrapper>
  );
};

export default Checkbox;