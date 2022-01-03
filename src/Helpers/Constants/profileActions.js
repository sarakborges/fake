import {
  faHome,
  faComment,
  faUserFriends,
  faUserPlus,
  faUserAltSlash,
  faUnlockAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "Helpers/routes";

export const PROFILE_ACTIONS = [
  {
    id: "home",
    type: "link",
    title: "Perfil",
    icon: faHome,
    to: ROUTES.PROFILE,
  },

  {
    id: "connections",
    type: "link",
    title: "Conexões",
    icon: faUserFriends,
    to: ROUTES.PROFILE_CONNECTIONS,
  },

  {
    id: "messages",
    type: "link",
    title: "Mensagens",
    icon: faComment,
    to: "#",
  },

  {
    id: "add",
    type: "button",
    title: "Solicitar conexão",
    icon: faUserPlus,
    hideCondition: "isNotConnected",
    action: "connectTo",
  },

  {
    id: "remove",
    type: "button",
    title: "Remover conexão",
    icon: faUserAltSlash,
    hideCondition: "hasAnyConnectionStatus",
    action: "removeConnection",
  },

  {
    id: "block",
    type: "button",
    title: "Bloquear",
    icon: faLock,
    hideCondition: "isBlocked",
    action: "blockUser",
  },

  {
    id: "block",
    type: "button",
    title: "Desbloquear",
    icon: faUnlockAlt,
    hideCondition: "isNotBlocked",
    action: "unBlockUser",
  },
];
