// Themes
import Themes from "Styles/Themes";

export const getAppData = (themeSlug) => {
  // localStorage.clear();
  const localTheme = localStorage.getItem("theme");
  const localAdult = localStorage.getItem("displayAdult");
  let themeJson;
  let adultJson;

  if (localTheme) {
    themeJson = JSON.parse(localTheme);
  }

  if (localAdult) {
    adultJson = JSON.parse(localAdult);
  }

  const theme = themeJson || themeSlug;
  const adult = adultJson || false;

  const foundTheme = {
    ...Themes.find((item) => item.slug === theme),
  };

  return { theme: foundTheme, displayAdult: adult };
};
