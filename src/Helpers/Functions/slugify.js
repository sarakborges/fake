export const slugify = (str) => {
  return str
    .toLocaleLowerCase("pt-BR")
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
    .trim();
};
