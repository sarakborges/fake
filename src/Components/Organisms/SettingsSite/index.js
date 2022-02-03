// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Themes
import Themes from "Styles/Themes";

// Style
import * as S from "./style";
import Checkbox from "Components/Atoms/Checkbox";

// Template
const SettingsSite = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const { theme, displayAdult } = appState;

  const setTheme = (themeSlug) => {
    appDispatch({
      type: "SET_THEME",
      data: Themes.find((item) => item.slug === themeSlug),
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
      <Text type='title' pb={16}>
        Configurações do site
      </Text>

      <S.List>
        <S.Row>
          <Text type='subtitle'>Qual tema você prefere?</Text>

          <S.ThemeOptions>
            {Themes.map((item) => {
              return (
                <Button
                  key={item.slug}
                  style='transparent'
                  onClick={() => {
                    setTheme(item.slug);
                  }}
                >
                  <S.ThemeButton
                    theme={item.slug}
                    isActive={item.slug === theme.slug}
                    thumb={item.thumb}
                  />
                </Button>
              );
            })}
          </S.ThemeOptions>
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
