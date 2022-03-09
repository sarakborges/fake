export const getAppData = () => {
  // localStorage.clear();
  const localAdult = localStorage.getItem("displayAdult");
  let adultJson;

  if (localAdult) {
    adultJson = JSON.parse(localAdult);
  }

  const adult = adultJson || false;

  return { displayAdult: adult };
};
