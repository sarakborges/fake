import {
  faComment,
  faHome,
  faUsers,
  faBell,
  faCog,
  faUser,
  faUserFriends,
  faSignOutAlt,
  faExclamation,
  faPlus,
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
      needsProfile: true,
      activeOnRoutes: [ROUTES.PROFILE.replace(":id", "[url]")],
    },

    {
      icon: faUserFriends,
      text: "Conexões",
      link: ROUTES.PROFILE_CONNECTIONS,
      needsProfile: true,
      activeOnRoutes: [ROUTES.PROFILE_CONNECTIONS.replace(":id", "[url]")],
    },

    {
      icon: faUsers,
      text: "Grupos",
      link: ROUTES.PROFILE_GROUPS,
      needsProfile: true,
      activeOnRoutes: [
        ROUTES.GROUP.replace(":id", "[url]"),
        ROUTES.PROFILE_GROUPS.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.ALL.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.MEMBERS.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.MODERATORS.replace(":id", "[url]"),
        ROUTES.GROUP_MEMBERS.OWNER.replace(":id", "[url]"),
      ],
    },

    {
      icon: faComment,
      text: "Mensagens",
      link: ROUTES.MESSAGES,
      needsProfile: true,
      activeOnRoutes: [ROUTES.MESSAGES.replace(":id", "[url]")],
    },

    {
      icon: faBell,
      text: "Notificações",
      link: ROUTES.NOTIFICATIONS,
      needsProfile: true,
      activeOnRoutes: [ROUTES.NOTIFICATIONS],
    },
  ],

  [
    {
      icon: faPlus,
      text: "Criar grupo",
      link: ROUTES.NEW_GROUP,
      activeOnRoutes: [ROUTES.NEW_GROUP],
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
      text: "Sobre",
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
