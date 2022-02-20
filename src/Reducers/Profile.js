export const ProfileReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_PROFILE": {
      const newData = { ...data };
      return newData;
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on UserReducer`);
    }
  }
};
