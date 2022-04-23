export const MessagesReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_MESSAGES": {
      const newData = { ...state, messages: [...data] };
      return newData;
    }

    case "SET_CHAT_USERS": {
      const newData = { ...state, chatUsers: [...data] };
      return newData;
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on MessagesReducer`);
    }
  }
};
