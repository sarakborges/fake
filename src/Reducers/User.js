export const UserReducer = (state, { type, data }) => {
  switch (type) {
    case "SET_USER": {
      const newData = { ...data };

      localStorage.setItem("user", JSON.stringify(newData));

      return newData;
    }

    case "SET_ACTIVE_PROFILE": {
      const newData = {
        ...state,

        profile: { ...data },
      };

      localStorage.setItem("user", JSON.stringify(newData));

      return newData;
    }

    case "SET_PROFILE": {
      const newData = {
        ...state,

        user: {
          ...state.user,
          profiles: [...data.profiles],
        },

        profile: { ...data.profile },
      };

      localStorage.setItem("user", JSON.stringify(newData));

      return newData;
    }

    case "SET_NEW_PROFILE": {
      const newData = {
        ...state,

        user: {
          ...state.user,

          profiles:
            state.user.profiles?.length > 0
              ? [...state.user.profiles, { ...data }]
              : [{ ...data }],
        },

        profile: { ...data },
      };

      localStorage.setItem("user", JSON.stringify(newData));

      return newData;
    }

    default: {
      throw new Error(`Unknown type ${type} reducer on UserReducer`);
    }
  }
};
