// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";
import Checkbox from "Components/Atoms/Checkbox";

// Themes
import Colors from "Styles/Colors";

// Style
import * as S from "./style";

const SettingsSite = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const { theme, displayAdult } = appState;

  const setTheme = (newTheme) => {
    localStorage.setItem(
      "theme",
      JSON.stringify({ ...theme, localTheme: newTheme })
    );

    appDispatch({
      type: "SET_THEME",
      data: { ...theme, localTheme: newTheme },
    });
  };

  const setMainColor = (newMainColor) => {
    localStorage.setItem(
      "theme",
      JSON.stringify({ ...theme, localMainColor: newMainColor })
    );

    appDispatch({
      type: "SET_THEME",
      data: { ...theme, localMainColor: newMainColor },
    });
  };

  const setDisplayAdult = () => {
    appDispatch({
      type: "SET_DISPLAY_ADULT",
      data: !displayAdult,
    });
  };

  return (
    <>
      <Text type='title' pb={32}>
        Configurações do site
      </Text>

      <S.List>
        <S.Row>
          <Text type='custom' fs={12} fw={400}>
            Tema:
          </Text>

          <Button
            style='borderless'
            size={12}
            onClick={() =>
              setTheme(theme?.localTheme === "dark" ? "light" : "dark")
            }
          >
            Mudar para tema {theme?.localTheme === "dark" ? "claro" : "escuro"}
          </Button>
        </S.Row>

        <S.Row>
          <Text type='custom' fs={12} fw={400}>
            Cor de destaque:
          </Text>

          {Object.keys(Colors).map((item) => {
            return (
              <S.ColorButton key={item} color={Colors[item]}>
                <Button style='borderless' onClick={() => setMainColor(item)} />
              </S.ColorButton>
            );
          })}
        </S.Row>

        <S.Row>
          <Checkbox
            id='display-adult'
            label='Deseja visualizar conteúdo adulto no site?'
            checked={displayAdult}
            onChange={setDisplayAdult}
          />
        </S.Row>
      </S.List>
    </>
  );
};

export default SettingsSite;
