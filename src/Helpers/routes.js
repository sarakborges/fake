export const ROUTES = {
  ABOUT: "/",
  HOME: "/home",
  NOTIFICATIONS: "/notifications",
  LOGIN: "/login",
  REGISTER: "/register",
  SEARCH: "/search/:str",

  NEW_GROUP: "/new-group",
  NEW_PROFILE: "/new-profile",

  GROUP: "/group/:id",
  GROUP_FORUM: "/group/:id/forum",
  PROFILE: "/profile/:id",
  MESSAGES: "/messages/:id",

  GROUPS: "/groups",

  PROFILE_CONNECTIONS: "/profile/:id/connections",
  PROFILE_MUTUAL_CONNECTIONS: "/profile/:id/mutual-connections",
  PROFILE_BLOCKED: "/profile/:id/blocked-profiles",
  PROFILE_PENDING: "/profile/:id/pending-profiles",

  PROFILE_GROUPS: "/profile/:id/groups",
  PROFILE_FEED: "/profile/:id/feed",

  GROUP_MEMBERS: {
    ALL: "/group/:id/members/all",
    MODERATORS: "/group/:id/members/moderators",
    MEMBERS: "/group/:id/members/members",
    CONNECTIONS: "/group/:id/members/connections",
  },

  SETTINGS: {
    PROFILE: "/settings/profile",
    ACCOUNT: "/settings/account",
    SITE: "/settings/site",
    GROUP: "/settings/group/:id",
  },
};
