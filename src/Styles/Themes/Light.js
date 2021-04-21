import { colors } from "Styles/Themes/Colors";

export default {
  slug: "lighttheme",

  body: {
    bgColor: colors.white,
    fontColor: colors.black,
    linkColor: colors.lightBlue,
  },

  button: {
    bgColor: colors.white,
    fontColor: colors.black,

    hover: {
      bgColor: colors.white,
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

  profile: {
    lineColors: `${colors.black}10`,

    header: {
      buttons: {
        bgColor: colors.white,
        fontColor: colors.dark,
        borderColor: colors.dark,

        hover: {
          bgColor: colors.lighter,
        },
      },

      status: {
        fontColor: colors.gray,
        highlightColor: colors.black,
      },
    },
  },
};
