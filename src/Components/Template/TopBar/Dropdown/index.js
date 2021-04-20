// Dependencies
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faDoorOpen,
  faCog,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

// Contexts
import { AppContext } from "Contexts/App";

// Components
import { Button } from "Components/Form/Button/style";

// Style
import DarkTheme from "Styles/Themes/Dark";
import LightTheme from "Styles/Themes/Light";
import * as s from "./style";

// Template
const TopBar = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const { theme } = appState;

  const customStyle = {
    height: "50px",
    width: "100%",
    placeContent: "flex-start",
    backgroundColor: theme.topBar.dropDown.button.bgColor,
    color: theme.topBar.dropDown.button.fontColor,
  };

  const toggleTheme = () => {
    appDispatch({
      type: "SET_THEME",
      data: theme.slug === "darktheme" ? LightTheme : DarkTheme,
    });
  };

  return (
    <s.Container>
      <s.MenuItem>
        <Button onClick={toggleTheme} customStyle={customStyle}>
          <s.MenuItemIcon>
            <FontAwesomeIcon
              icon={theme.slug === "darktheme" ? faSun : faMoon}
            />
          </s.MenuItemIcon>

          <s.MenuItemText>
            Ativar tema {theme.slug === "darktheme" ? "claro" : "escuro"}
          </s.MenuItemText>
        </Button>
      </s.MenuItem>

      <s.MenuItem>
        <Button customStyle={customStyle}>
          <s.MenuItemIcon>
            <FontAwesomeIcon icon={faExchangeAlt} />
          </s.MenuItemIcon>

          <s.MenuItemText>Escolher perfil ativo</s.MenuItemText>
        </Button>
      </s.MenuItem>

      <s.MenuItem>
        <Button customStyle={customStyle}>
          <s.MenuItemIcon>
            <FontAwesomeIcon icon={faCog} />
          </s.MenuItemIcon>

          <s.MenuItemText>Configurações</s.MenuItemText>
        </Button>
      </s.MenuItem>

      <s.MenuItem>
        <Button customStyle={customStyle}>
          <s.MenuItemIcon>
            <FontAwesomeIcon icon={faDoorOpen} />
          </s.MenuItemIcon>

          <s.MenuItemText>Sair</s.MenuItemText>
        </Button>
      </s.MenuItem>
    </s.Container>
  );
};

export default TopBar;
