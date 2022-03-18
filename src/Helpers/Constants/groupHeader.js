import { ROUTES } from "Helpers/routes";

export const GROUP_HEADER = {
  SECTIONS: [
    {
      id: "about",
      title: "Início",
      to: ROUTES.GROUP,
      activeOnRoutes: [ROUTES.GROUP.replace(":id", "[url]")],
    },

    {
      id: "forum",
      title: "Fórum",
      to: ROUTES.GROUP_FORUM,
      activeOnRoutes: [ROUTES.GROUP_FORUM.replace(":id", "[url]")],
    },

    {
      id: "members",
      type: "link",
      title: "Participantes",
      to: ROUTES.GROUP_MEMBERS.ALL,
      activeOnRoutes: [
        ROUTES.GROUP_MEMBERS.ALL.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.MEMBERS.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.MODERATORS.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.CONNECTIONS.replace(":id", "[url]"),
      ],
    },

    {
      id: "related",
      title: "Grupos relacionados",
      to: "#",
      activeOnRoutes: [],
    },
  ],

  ACTIONS: [
    {
      id: "enter",
      type: "button",
      title: "Participar",
      hideCondition: "isMember",
      action: "enterGroup",
    },

    {
      id: "leave",
      type: "button",
      title: "Deixar de participar",
      hideCondition: "isNotMember",
      action: "leaveGroup",
    },
  ],
};
