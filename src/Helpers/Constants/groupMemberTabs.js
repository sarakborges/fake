import { ROUTES } from "Helpers/routes";

export const GROUP_MEMBERS_TABS = [
  {
    link: ROUTES.GROUP_MEMBERS.ALL,
    text: "Todos participantes",
  },

  {
    link: ROUTES.GROUP_MEMBERS.MEMBERS,
    text: "Apenas membros",
  },

  {
    link: ROUTES.GROUP_MEMBERS.MODERATORS,
    text: "Apenas moderadores",
  },

  {
    link: ROUTES.GROUP_MEMBERS.OWNER,
    text: "Apenas dono",
  },
];
