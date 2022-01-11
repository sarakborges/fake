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
      id: "cancel",
      type: "button",
      title: "Cancelar solicitação de conexão",
      hideCondition: "isNotPending",
      action: "removeConnection",
    },

    {
      id: "refuse",
      type: "button",
      title: "Recusar solicitação de conexão",
      hideCondition: "isNotSent",
      action: "removeConnection",
    },
  ],

  MORE_ACTIONS: [
    {
      id: "edit",
      type: "button",
      title: "Editar perfil",
      hideCondition: "isNotSelf",
    },

    {
      id: "block",
      type: "button",
      title: "Bloquear",
      hideCondition: "isBlocked",
      action: "blockUser",
    },

    {
      id: "block",
      type: "button",
      title: "Desbloquear",
      hideCondition: "isNotBlocked",
      action: "unBlockUser",
    },
  ],
};
