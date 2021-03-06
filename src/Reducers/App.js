export const AppReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_THEME": {
      const newData = { ...state, theme: { ...data } };

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

    case "SET_IS_REQUESTING": {
      return { ...state, isRequesting: data };
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on AppReducer`);
    }
  }
};
