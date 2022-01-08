import {
  faHome,
  faList,
  faPencilAlt,
  faSignInAlt,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "Helpers/routes";

export const GROUP_ACTIONS = [
  {
    id: "home",
    type: "link",
    title: "Grupo",
    icon: faHome,
    to: ROUTES.GROUP,
  },

  {
    id: "members",
    type: "link",
    title: "Membros",
    icon: faUsers,
    to: ROUTES.GROUP_MEMBERS.MEMBERS,
  },

  {
    id: "forum",
    type: "link",
    title: "Fórum",
    icon: faList,
    to: "#",
  },

  {
    id: "enter",
    type: "button",
    title: "Entrar no grupo",
    icon: faSignInAlt,
    hideCondition: "isMember",
    action: "enterGroup",
  },

  {
    id: "leave",
    type: "button",
    title: "Sair do grupo",
    icon: faSignOutAlt,
    hideCondition: "isNotMember",
  },

  {
    id: "edit",
    type: "button",
    title: "Editar grupo",
    icon: faPencilAlt,
    hideCondition: "isNotOwner",
  },
];
