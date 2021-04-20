export const UserReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_USER": {
      return { ...data };
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on UserReducer`);
    }
  }
};
