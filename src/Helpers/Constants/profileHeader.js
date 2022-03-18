import { ROUTES } from "Helpers/routes";

export const PROFILE_HEADER = {
  SECTIONS: [
    {
      id: "about",
      type: "link",
      title: "Início",
      to: ROUTES.PROFILE,
      activeOnRoutes: [ROUTES.PROFILE.replace(":id", "[url]")],
    },

    {
      id: "feed",
      type: "link",
      title: "Feed",
      to: ROUTES.PROFILE_FEED,
      activeOnRoutes: [ROUTES.PROFILE_FEED.replace(":id", "[url]")],
    },

    {
      id: "connections",
      type: "link",
      title: "Conexões",
      to: ROUTES.PROFILE_CONNECTIONS,
      activeOnRoutes: [
        ROUTES.PROFILE_CONNECTIONS.replace(":id", "[url]"),
        ROUTES.PROFILE_MUTUAL_CONNECTIONS.replace(":id", "[url]"),
        ROUTES.PROFILE_BLOCKED.replace(":id", "[url]"),
        ROUTES.PROFILE_PENDING.replace(":id", "[url]"),
      ],
    },

    {
      id: "groups",
      type: "link",
      title: "Grupos",
      to: ROUTES.PROFILE_GROUPS,
      activeOnRoutes: [ROUTES.PROFILE_GROUPS.replace(":id", "[url]")],
    },
  ],

  ACTIONS: [
    {
      id: "add",
      hideCondition: "hasAnyConnectionStatus",
      action: "connectTo",
    },

    {
      id: "cancel",
      hideCondition: "isNotPending",
      action: "cancelConnection",
    },

    {
      id: "remove",
      hideCondition: "isNotConnected",
      action: "removeConnection",
    },

    {
      id: "block",
      hideCondition: "isBlocked",
      action: "blockProfile",
    },

    {
      id: "block",
      hideCondition: "isNotBlocked",
      action: "unBlockProfile",
    },
  ],
};
