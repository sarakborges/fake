// Dependencies
import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";
import { UserContext } from "Contexts/User";

// Components
import UserArea from "Components/Template/UserArea";
import SearchBar from "Components/Template/SearchBar";
import TopBarMenu from "Components/Template/TopBar/Menu";
import TopBarDropdown from "Components/Template/TopBar/Dropdown";
import Button from "Components/Form/Button";

// Assets
import InstagramLogo from "Assets/instagram";

// Style
import * as s from "./style";

// Template
const TopBar = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const { theme, topBar } = appState;

  const { userState } = useContext(UserContext);
  const { user } = userState;

  const toggleDropdown = () => {
    appDispatch({
      type: "TOGGLE_TOPBAR_DROPDOWN",
      data: !topBar.display,
    });
  };

  return (
    <>
      <s.Container>
        <s.Logo>
          <Link href={ROUTES.HOME}>
            <a>
              <InstagramLogo />
            </a>
          </Link>
        </s.Logo>

        <SearchBar />

        <TopBarMenu />

        <UserArea user={user} />

        <Button
          customStyle={{
            height: "70px",
            width: "70px",
            backgroundColor: theme.topBar.bgColor,
            color: theme.body.fontColor,
            fontSize: "20px",
          }}
          onClick={toggleDropdown}
        >
          <FontAwesomeIcon
            icon={topBar.display ? faChevronUp : faChevronDown}
          />
        </Button>
      </s.Container>

      {topBar.display && <TopBarDropdown />}
    </>
  );
};

export default TopBar;
