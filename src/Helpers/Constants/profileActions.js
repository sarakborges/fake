import { faComment } from "@fortawesome/free-regular-svg-icons";
import {
  faEllipsisH,
  faHome,
  faSignOutAlt,
  faUserFriends,
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
    id: "messages",
    type: "link",
    icon: faComment,
    to: "#",
  },

  {
    id: "connections",
    type: "link",
    icon: faUserFriends,
    to: ROUTES.PROFILE_CONNECTIONS,
  },
];
