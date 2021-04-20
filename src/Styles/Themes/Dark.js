import { colors } from "Styles/Themes/Colors";

export default {
  slug: "darktheme",

  body: {
    bgColor: colors.dark,
    fontColor: colors.white,
  },

  button: {
    bgColor: colors.white,
    fontColor: colors.black,

    hover: {
      bgColor: colors.dark,
      fontColor: colors.white,
    },
  },

  alertBar: {
    fontColor: colors.white,

    success: {
      bgColor: colors.green,
      iconColor: colors.white,
    },

    warning: {
      bgColor: colors.yellow,
      iconColor: colors.white,
    },

    error: {
      bgColor: colors.red,
      iconColor: colors.white,
    },
  },

  topBar: {
    bgColor: colors.darker,
    avatarBg: colors.white,
    linkColor: colors.gray,

    search: {
      bgColor: colors.white,
    },

    dropDown: {
      button: {
        bgColor: colors.darker,
        fontColor: colors.white,
      },

      border: colors.darker,
    },
  },
};
