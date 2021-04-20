export const AppReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_TOAST": {
      return { ...state, toast: data };
    }

    case "SET_THEME": {
      return { ...state, theme: data };
    }

    case "TOGGLE_TOPBAR_DROPDOWN": {
      return { ...state, topBar: { ...state.topBar, display: data } };
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on AppReducer`);
    }
  }
};
