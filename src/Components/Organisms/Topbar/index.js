// Dependencies
import Link from "next/link";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faEnvelope,
  faHome,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { UserContext } from "Contexts/User";

// Atoms
import Button from "Components/Atoms/Button";
import ButtonLink from "Components/Atoms/ButtonLink";
import Text from "Components/Atoms/Text";

// Organisms
import SearchForm from "Components/Organisms/SearchForm";
import SelectProfile from "Components/Organisms/SelectProfile";

// Style
import * as S from "./style";

// Template
const TopBar = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  return (
    <S.Topbar>
      <S.ToggleMenu>
        <Button
          style='transparent'
          onClick={() => setDisplaySidebar(!displaySidebar)}
          size={20}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </S.ToggleMenu>

      <S.ActionsWrapper>
        <Text type='custom' fs={20}>
          <Link href={ROUTES.HOME}>
            <a>
              <FontAwesomeIcon icon={faHome} />
            </a>
          </Link>
        </Text>
      </S.ActionsWrapper>

      <S.SearchWrapper>
        <SearchForm />
      </S.SearchWrapper>

      <S.ActionsButtons>
        <ButtonLink href={ROUTES.NEW_GROUP}>
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span>Criar grupo</span>
          </>
        </ButtonLink>

        <ButtonLink href={ROUTES.NEW_PROFILE}>
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span>Criar perfil</span>
          </>
        </ButtonLink>
      </S.ActionsButtons>

      <S.ActionsWrapper>
        {profile?._id && <SelectProfile />}

        <Text type='custom' fs={20}>
          <FontAwesomeIcon icon={faBell} />
        </Text>

        <Text type='custom' fs={20}>
          <FontAwesomeIcon icon={faEnvelope} />
        </Text>
      </S.ActionsWrapper>
    </S.Topbar>
  );
};

export default TopBar;
