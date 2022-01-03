import {
  faEllipsisH,
  faHome,
  faList,
  faSignOutAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES } from "Helpers/routes";

export const GROUP_ACTIONS = [
  {
    id: "home",
    type: "link",
    icon: faHome,
    to: ROUTES.GROUP,
  },

  {
    id: "members",
    type: "link",
    icon: faUsers,
    to: ROUTES.GROUP_MEMBERS.MEMBERS,
  },

  {
    id: "forum",
    type: "link",
    icon: faList,
    to: "#",
  },

  {
    id: "leave",
    type: "button",
    icon: faSignOutAlt,
    hideCondition: "isOwner",
  },

  {
    id: "more",
    type: "button",
    icon: faEllipsisH,
    hideCondition: "isNotOwner",
  },
];
