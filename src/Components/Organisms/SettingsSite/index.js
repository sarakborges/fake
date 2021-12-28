// Dependencies
import { useContext } from "react";

// Contexts
import { AppContext } from "Contexts/App";

// Atoms
import Form from "Components/Atoms/Form";
import Button from "Components/Atoms/Button";
import Text from "Components/Atoms/Text";

// Themes
import Themes from "Styles/Themes";

// Style
import * as S from "./style";

// Template
const SettingsSite = () => {
  const { appState, appDispatch } = useContext(AppContext);
  const { theme } = appState;

  const setTheme = (themeSlug) => {
    appDispatch({
      type: "SET_THEME",
      data: Themes.find((item) => item.slug === themeSlug),
    });
  };

  const handleSubmit = () => {};

  return (
    <S.SettingsWrapper>
      <Text type='title' pb={16}>
        Configurações do site
      </Text>

      <Form onSubmit={handleSubmit}>
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
      </Form>
    </S.SettingsWrapper>
  );
};

export default SettingsSite;
