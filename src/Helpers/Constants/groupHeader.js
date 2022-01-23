import { ROUTES } from "Helpers/routes";

export const GROUP_HEADER = {
  SECTIONS: [
    {
      id: "about",
      type: "link",
      title: "Sobre",
      to: ROUTES.GROUP,
      activeOnRoutes: [ROUTES.GROUP.replace(":id", "[url]")],
    },

    {
      id: "forum",
      type: "link",
      title: "Fórum",
      to: "#",
      activeOnRoutes: ["#"],
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
        ROUTES.GROUP_MEMBERS.OWNER.replace(":id", "[url]"),
      ],
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

  MORE_ACTIONS: [
    {
      id: "edit",
      type: "button",
      title: "Editar grupo",
      hideCondition: "isNotOwner",
    },
  ],
};
