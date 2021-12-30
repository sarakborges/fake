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
      activeOnRoutes: [ROUTES.HOME],
    },

    {
      icon: faUser,
      text: "Perfil",
      link: ROUTES.PROFILE,
      activeOnRoutes: [ROUTES.PROFILE.replace(":id", "[url]")],
    },

    {
      icon: faComment,
      text: "Mensagens",
      link: "#",
      activeOnRoutes: [],
    },

    {
      icon: faBell,
      text: "Notificações",
      link: "#",
      activeOnRoutes: [],
    },

    {
      icon: faUserFriends,
      text: "Conexões",
      link: ROUTES.CONNECTIONS,
      activeOnRoutes: [ROUTES.CONNECTIONS],
    },

    {
      icon: faUsers,
      text: "Grupos",
      link: ROUTES.GROUPS,
      activeOnRoutes: [
        ROUTES.GROUPS,
        ROUTES.GROUP.replace(":id", "[url]"),
        ROUTES.NEW_GROUP,
      ],
    },
  ],

  [
    {
      icon: faIdCard,
      text: "Escolher perfil",
      link: ROUTES.SELECT_PROFILE,
      activeOnRoutes: [ROUTES.SELECT_PROFILE, ROUTES.NEW_PROFILE],
    },

    {
      icon: faCog,
      text: "Configurações",
      link: ROUTES.SETTINGS.PROFILE,
      activeOnRoutes: [
        ROUTES.SETTINGS.ACCOUNT,
        ROUTES.SETTINGS.PROFILE,
        ROUTES.SETTINGS.SITE,
      ],
    },

    {
      icon: faExclamation,
      text: "Aviso sobre BETA",
      link: ROUTES.ABOUT,
      activeOnRoutes: [],
    },

    {
      icon: faSignOutAlt,
      text: "Sair",
      activeOnRoutes: [],
    },
  ],
];
