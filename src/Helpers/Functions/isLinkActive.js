export const isLinkActive = (link, pathname) => {
  for (let route of link.activeOnRoutes) {
    if (pathname === route) {
      return true;
    }
  }

  return false;
};
