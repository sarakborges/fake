// Dependencies
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Atoms
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const NoFeed = ({ name }) => {
  return (
    <S.NoFeed>
      <S.NoFeedWrapper>
        <S.NoFeedIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </S.NoFeedIcon>

        <Text type='pagetitle'>Nenhuma publicação</Text>

        <Text ta='center'>
          {!name ? (
            <>
              Seu feed está vazio. Nem você, nem suas conexões, fizeram
              publicações. Que tal fazer a primeira?
            </>
          ) : (
            <>
              <b>{name}</b> ainda não publicou nada.
            </>
          )}
        </Text>
      </S.NoFeedWrapper>
    </S.NoFeed>
  );
};

export default NoFeed;
