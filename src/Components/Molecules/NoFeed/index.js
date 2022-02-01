// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

// Template
const NoFeed = () => {
  return (
    <S.NoFeed>
      <S.NoFeedWrapper>
        <S.NoFeedIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </S.NoFeedIcon>

        <Text type='pagetitle'>Nenhuma publicação</Text>

        <Text ta='center'>
          Seu feed está vazio porque nem você, nem suas conexões publicaram nada
          ainda. Que tal fazer a primeira?
        </Text>
      </S.NoFeedWrapper>
    </S.NoFeed>
  );
};

export default NoFeed;
