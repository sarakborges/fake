// Dependencies
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";
import { SITE_NAME } from "Helpers/Constants";

// Atoms
import Text from "Components/Atoms/Text";

// Style
import * as S from "./style";

const NoProfile = () => {
  return (
    <S.NoProfile>
      <S.NoProfileWrapper>
        <S.NoProfileIcon>
          <FontAwesomeIcon icon={faExclamationTriangle} />
        </S.NoProfileIcon>

        <Text type='pagetitle'>Você ainda não possui um perfil</Text>

        <Text ta='center'>
          <>
            Para poder usar o <span>{SITE_NAME}</span> completamente, você
            precisa criar um perfil. Para isso, basta clicar
          </>

          <> </>

          <Link href={ROUTES.NEW_PROFILE}>
            <a>aqui</a>
          </Link>

          <> e preencher os dados necessários.</>
        </Text>
      </S.NoProfileWrapper>
    </S.NoProfile>
  );
};

export default NoProfile;
