import { ROUTES } from "Helpers/routes";

export const PROFILE_HEADER = {
  SECTIONS: [
    {
      id: "about",
      type: "link",
      title: "Sobre",
      to: ROUTES.PROFILE,
      activeOnRoutes: [ROUTES.PROFILE.replace(":id", "[url]")],
    },

    {
      id: "connections",
      type: "link",
      title: "Conexões",
      to: ROUTES.PROFILE_CONNECTIONS,
      activeOnRoutes: [ROUTES.PROFILE_CONNECTIONS.replace(":id", "[url]")],
    },

    {
      id: "groups",
      type: "link",
      title: "Grupos",
      to: ROUTES.PROFILE_GROUPS,
      activeOnRoutes: [ROUTES.PROFILE_GROUPS.replace(":id", "[url]")],
    },
  ],

  ACTIONS: [
    {
      id: "messages",
      type: "link",
      title: "Enviar mensagem",
      to: ROUTES.MESSAGES,
      hideCondition: "isBlocked",
    },

    {
      id: "add",
      type: "button",
      title: "Conectar-se",
      hideCondition: "hasAnyConnectionStatus",
      action: "connectTo",
    },

    {
      id: "remove",
      type: "button",
      title: "Remover conexão",
      hideCondition: "isNotConnected",
      action: "removeConnection",
    },

    {
      id: "block",
      type: "button",
      title: "Desbloquear",
      hideCondition: "isNotBlocked",
      action: "unBlockUser",
    },
  ],

  MORE_ACTIONS: [
    {
      id: "cancel",
      type: "button",
      title: "Cancelar solicitação",
      hideCondition: "isNotPending",
      action: "removeConnection",
    },

    {
      id: "accept",
      type: "button",
      title: "Aceitar conexão",
      hideCondition: "isNotSent",
      action: "acceptConnection",
    },

    {
      id: "refuse",
      type: "button",
      title: "Recusar conexão",
      hideCondition: "isNotSent",
      action: "removeConnection",
    },

    {
      id: "block",
      type: "button",
      title: "Bloquear",
      hideCondition: "isBlocked",
      action: "blockUser",
    },
  ],
};
