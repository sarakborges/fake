export const GroupReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_GROUP": {
      const newData = { ...data };
      return newData;
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on GroupReducer`);
    }
  }
};
