import { ROUTES } from "Helpers/routes";

export const CONNECTIONS_TABS = [
  {
    link: ROUTES.PROFILE_CONNECTIONS,
    text: "Todas conexões",
  },

  {
    link: ROUTES.PROFILE_BLOCKED,
    text: "Perfis bloqueados",
    condition: "isNotSelf",
  },

  {
    link: ROUTES.PROFILE_MUTUAL_CONNECTIONS,
    text: "Conexões em comum",
    condition: "isSelf",
  },
];
