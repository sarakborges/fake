import { colors } from "Styles/Themes/Colors";

export default {
  slug: "lighttheme",

  body: {
    bgColor: colors.white,
    fontColor: colors.black,
  },

  button: {
    bgColor: colors.white,
    fontColor: colors.black,

    hover: {
      bgColor: colors.light,
      fontColor: colors.black,
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
    bgColor: colors.lighter,
    avatarBg: colors.black,
    linkColor: colors.gray,

    search: {
      bgColor: colors.white,
    },

    dropDown: {
      button: {
        bgColor: colors.lighter,
        fontColor: colors.black,
      },

      border: colors.lighter,
    },
  },
};
