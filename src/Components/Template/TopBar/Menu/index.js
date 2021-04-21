// Dependencies
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";

// Helpers
import { ROUTES } from "Helpers/routes";

// Contexts
import { AppContext } from "Contexts/App";

// Components
import Button from "Components/Form/Button";

// Template
const TopBarMenu = () => {
  const { appState } = useContext(AppContext);
  const { theme } = appState;

  const menuButtonStyle = {
    height: "70px",
    width: "70px",
    backgroundColor: theme.topBar.bgColor,
    color: theme.body.fontColor,
    fontSize: "20px",
  };

  return (
    <>
      <Button type='link' link={ROUTES.HOME} customStyle={menuButtonStyle}>
        <FontAwesomeIcon icon={faHome} />
      </Button>

      <Button customStyle={menuButtonStyle}>
        <FontAwesomeIcon icon={faEnvelope} />
      </Button>

      <Button customStyle={menuButtonStyle}>
        <FontAwesomeIcon icon={faBell} />
      </Button>
    </>
  );
};

export default TopBarMenu;
