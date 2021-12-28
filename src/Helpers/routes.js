export const ROUTES = {
  ABOUT: "/",
  HOME: "/home",
  LOGIN: "/login",
  REGISTER: "/register",

  NEW_GROUP: "/new-group",
  NEW_PROFILE: "/new-profile",

  GROUP: "/group/:id",
  PROFILE: "/profile/:id",

  GROUPS: "/groups",
  CONNECTIONS: "/connections",

  PROFILE_CONNECTIONS: "/profile/:id/connections",
  SELECT_PROFILE: "/select-profile",

  GROUP_MEMBERS: {
    OWNER: "/group/:id/members/owner",
    MODERATORS: "/group/:id/members/moderators",
    MEMBERS: "/group/:id/members",
  },

  SETTINGS: {
    PROFILE: "/settings/profile",
    ACCOUNT: "/settings/account",
    SITE: "/settings/site",
  },
};
