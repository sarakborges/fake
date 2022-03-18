import { ROUTES } from "Helpers/routes";

export const GROUP_MEMBERS_TABS = [
  {
    link: ROUTES.GROUP_MEMBERS.ALL,
    text: "Todos participantes",
  },

  {
    link: ROUTES.GROUP_MEMBERS.MEMBERS,
    text: "Apenas participantes",
  },

  {
    link: ROUTES.GROUP_MEMBERS.MODERATORS,
    text: "Apenas moderadores",
  },

  {
    link: ROUTES.GROUP_MEMBERS.CONNECTIONS,
    text: "Conexões participantes",
  },
];
