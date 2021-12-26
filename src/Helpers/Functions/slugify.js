export const slugify = (str) => {
  return trim(
    str
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-")
  );
};
