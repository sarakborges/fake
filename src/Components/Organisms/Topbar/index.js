// Dependencies
import Link from "next/link";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
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

// Organisms
import SearchForm from "Components/Organisms/SearchForm";
import SelectProfile from "Components/Organisms/SelectProfile";
import NotificationsDropdown from "Components/Organisms/NotificationsDropdown";
import MessagesDropdown from "Components/Organisms/MessagesDropdown";

// Style
import * as S from "./style";

const TopBar = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  const { userState } = useContext(UserContext);
  const { profile } = userState;

  return (
    <S.Topbar>
      <S.ToggleMenu>
        <Button
          style='borderless'
          onClick={() => setDisplaySidebar(!displaySidebar)}
          size={20}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </S.ToggleMenu>

      <S.ActionsWrapper>
        <div>
          <Link href={ROUTES.HOME}>
            <a>
              <FontAwesomeIcon icon={faHome} />
            </a>
          </Link>
        </div>
      </S.ActionsWrapper>

      <S.SearchWrapper>
        <SearchForm />
      </S.SearchWrapper>

      <S.ActionsButtons>
        <ButtonLink href={ROUTES.NEW_PROFILE}>
          <>
            <FontAwesomeIcon icon={faPlus} />
            <span>Criar perfil</span>
          </>
        </ButtonLink>

        {profile?._id && (
          <ButtonLink href={ROUTES.NEW_GROUP}>
            <>
              <FontAwesomeIcon icon={faPlus} />
              <span>Criar grupo</span>
            </>
          </ButtonLink>
        )}
      </S.ActionsButtons>

      {profile?._id && (
        <S.ActionsWrapper>
          <SelectProfile />
          <NotificationsDropdown />
          <MessagesDropdown />
        </S.ActionsWrapper>
      )}
    </S.Topbar>
  );
};

export default TopBar;
