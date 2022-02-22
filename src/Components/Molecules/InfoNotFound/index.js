// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const InfoNotFound = ({ type }) => {
  return (
    <S.InfoNotFound>
      <S.InfoNotFoundWrapper>
        <S.InfoNotFoundIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </S.InfoNotFoundIcon>

        <Text type='pagetitle' ta='center' lh={1.6}>
          O {type === "profile" ? "perfil" : "grupo"} que você procurou não pode
          ser encontrado.
        </Text>
      </S.InfoNotFoundWrapper>
    </S.InfoNotFound>
  );
};

export default InfoNotFound;
