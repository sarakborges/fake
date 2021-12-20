// Themes
import Themes from "Styles/Themes";

export const getAppData = (appState) => {
  // localStorage.clear();
  const localData = localStorage.getItem("theme");
  let jsonData;

  if (jsonData) {
    jsonData = JSON.parse(localData);
  }

  const data = jsonData?.slug || appState.theme.slug;

  const foundTheme = {
    ...Themes.find((item) => item.slug === data),
  };

  return foundTheme;
};
