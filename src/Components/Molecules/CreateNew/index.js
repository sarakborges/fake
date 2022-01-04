// Dependencies
import Link from "next/link";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Atoms
import Text from "Components/Atoms/Text";

// Molecules
import InfoArea from "Components/Molecules/InfoArea";

// Style
import * as S from "./style";

// Template
const CreateNew = ({ type }) => {
  const typeStr =
    type === "group" ? "grupo" : type === "profile" ? "perfil" : "";

  return (
    <>
      <Text type='title' pb={16}>
        Criar novo {typeStr}
      </Text>

      <S.Wrapper>
        <Link href={type === "profile" ? ROUTES.NEW_PROFILE : ROUTES.NEW_GROUP}>
          <a>
            <InfoArea info={{ name: `Novo ${typeStr}`, icon: faPlus }} isBox />
          </a>
        </Link>
      </S.Wrapper>
    </>
  );
};

export default CreateNew;
