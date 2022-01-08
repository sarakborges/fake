export const ROUTES = {
  ABOUT: "/",
  HOME: "/home",
  NOTIFICATIONS: "/notifications",
  LOGIN: "/login",
  REGISTER: "/register",

  NEW_GROUP: "/new-group",
  NEW_PROFILE: "/new-profile",

  GROUP: "/group/:id",
  PROFILE: "/profile/:id",
  MESSAGES: "/messages/:id",

  GROUPS: "/groups",

  PROFILE_CONNECTIONS: "/profile/:id/connections",
  PROFILE_GROUPS: "/profile/:id/groups",

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
