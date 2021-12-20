export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  NEW_GROUP: "/new-group",
  NEW_PROFILE: "/new-profile",
  PROFILE: "/profile/:id",
  GROUP: "/group/:id",
  GROUPS: "/groups",
  CONNECTIONS: "/connections",
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
