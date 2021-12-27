import {
  faComment,
  faHome,
  faUsers,
  faBell,
  faCog,
  faIdCard,
  faUser,
  faUserFriends,
  faSignOutAlt,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "Helpers/routes";

export const LEFT_MENU = [
  [
    {
      icon: faHome,
      text: "Home",
      link: ROUTES.HOME,
    },

    {
      icon: faUser,
      text: "Perfil",
      link: "#",
    },

    {
      icon: faComment,
      text: "Mensagens",
      link: "#",
    },

    {
      icon: faBell,
      text: "Notificações",
      link: "#",
    },

    {
      icon: faUserFriends,
      text: "Conexões",
      link: ROUTES.CONNECTIONS,
    },

    {
      icon: faUsers,
      text: "Grupos",
      link: ROUTES.GROUPS,
    },
  ],

  [
    {
      icon: faIdCard,
      text: "Escolher perfil",
      link: ROUTES.SELECT_PROFILE,
    },

    {
      icon: faCog,
      text: "Configurações",
      link: ROUTES.SETTINGS.PROFILE,
    },

    {
      icon: faExclamation,
      text: "Aviso sobre BETA",
      link: ROUTES.ABOUT,
    },

    {
      icon: faSignOutAlt,
      text: "Sair",
    },
  ],
];
