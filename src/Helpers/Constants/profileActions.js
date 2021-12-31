import {
  faHome,
  faComment,
  faUserFriends,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "Helpers/routes";

export const PROFILE_ACTIONS = [
  {
    id: "home",
    type: "link",
    icon: faHome,
    to: ROUTES.PROFILE,
  },

  {
    id: "connections",
    type: "link",
    icon: faUserFriends,
    to: ROUTES.PROFILE_CONNECTIONS,
  },

  {
    id: "messages",
    type: "link",
    icon: faComment,
    to: "#",
  },

  {
    id: "add",
    type: "button",
    icon: faUserPlus,
    condition: "isNotSelf",
  },
];
