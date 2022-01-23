// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

// Template
const AdultWarning = ({ type, setDisplayAdult }) => {
  return (
    <S.InfoNotFound>
      <S.InfoNotFoundWrapper>
        <S.InfoNotFoundIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </S.InfoNotFoundIcon>

        <Text type='pagetitle' ta='center' lh={1.6}>
          O {type === "profile" ? "perfil" : "grupo"} que você está acessando
          foi marcado como conteúdo adulto.
        </Text>

        <Button style='primary' size={16} onClick={() => setDisplayAdult(true)}>
          Ver {type === "profile" ? "perfil" : "grupo"}
        </Button>
      </S.InfoNotFoundWrapper>
    </S.InfoNotFound>
  );
};

export default AdultWarning;
