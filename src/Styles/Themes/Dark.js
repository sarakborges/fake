import { colors } from "Styles/Themes/Colors";

export default {
  slug: "darktheme",

  body: {
    bgColor: colors.dark,
    fontColor: colors.white,
    linkColor: colors.lightBlue,
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

  profile: {
    lineColors: `${colors.white}10`,

    header: {
      buttons: {
        bgColor: colors.dark,
        fontColor: colors.white,
        borderColor: colors.white,

        hover: {
          bgColor: colors.darker,
        },
      },

      status: {
        fontColor: colors.gray,
        highlightColor: colors.white,
      },
    },
  },
};
