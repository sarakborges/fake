export const AppReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_THEME": {
      const newData = { ...state, theme: { ...data } };

      localStorage.setItem("theme", JSON.stringify(data.slug));

      return newData;
    }

    case "SET_TOAST": {
      return { ...state, toast: { ...data } };
    }

    case "SET_DISPLAY_ADULT": {
      localStorage.setItem("displayAdult", JSON.stringify(data));

      return { ...state, displayAdult: data };
    }

    case "TOGGLE_TOAST": {
      return { ...state, toast: { ...state.toast, isVisible: data } };
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on AppReducer`);
    }
  }
};
