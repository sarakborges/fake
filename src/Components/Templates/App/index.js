// Dependencies
import { useEffect, useContext } from "react";
import { ThemeProvider } from "styled-components";

// Contexts
import { AppContext } from "Contexts/App";

// Molecules
import Toast from "Components/Molecules/Toast";

// Organisms
import SelectTheme from "Components/Organisms/SelectTheme";

// Themes
import Themes from "Styles/Themes";
import Colors from "Styles/Colors";

// Styles
import { GlobalStyle } from "Styles/global";
import { DefaultStyle } from "Styles/default";

// Component
const AppTemplate = ({ children }) => {
  const { appState, appDispatch } = useContext(AppContext);
  const { theme, toast } = appState;

  useEffect(() => {
    if (typeof window !== "undefined") {
      // localStorage.clear();
      const localStorageTheme = localStorage.getItem("theme");

      if (localStorageTheme) {
        const { localTheme, localMainColor } = JSON.parse(localStorageTheme);

        if (!localTheme || !localMainColor) {
          return;
        }

        appDispatch({
          type: "SET_THEME",
          data: { localTheme, localMainColor },
        });
      }
    }
  }, []);

  return (
    <>
      {theme ? (
        <ThemeProvider
          theme={{
            ...Themes[theme.localTheme],
            main: Colors[theme.localMainColor],
          }}
        >
          <GlobalStyle />

          {<Toast {...toast} />}

          {children}
        </ThemeProvider>
      ) : (
        <>
          <DefaultStyle />
          <SelectTheme />
        </>
      )}
    </>
  );
};

export default AppTemplate;
