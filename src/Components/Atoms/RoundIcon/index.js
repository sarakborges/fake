import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Style
import * as S from "./style";

// Template
const RoundIcon = ({ icon, size, bgColor }) => {
  return (
    <S.RoundIcon size={size} bgColor={bgColor}>
      <FontAwesomeIcon icon={icon} />
    </S.RoundIcon>
  );
};

export default RoundIcon;
