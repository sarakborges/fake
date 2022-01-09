// Themes
import Themes from "Styles/Themes";

export const getAppData = (themeSlug) => {
  // localStorage.clear();
  const localData = localStorage.getItem("theme");
  let jsonData;

  if (localData) {
    jsonData = JSON.parse(localData);
  }

  const data = jsonData || themeSlug;

  const foundTheme = {
    ...Themes.find((item) => item.slug === data),
  };

  return foundTheme;
};
