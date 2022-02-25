/* Core */
import { useMemo } from "react";
import { createTheme } from "@material-ui/core/styles";
/* Config */
import { themeConfig } from "./themeConfig";

const defaultTheme = {
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "*": {
          boxSizing: "border-box",
          outline: "none",
        },
        "@font-face": {
          fontFamily: themeConfig.fontFamilyBase,
          fontStyle: "normal",
          fontWeight: themeConfig.fontWeightMedium,
        },
        body: {
          backgroundColor: themeConfig.colorBackground,
        },
        main: {
          padding: "0 5% 0 5%",
        },
      },
    },
    MuiDrawer: {
      paper: {
        width: themeConfig.drawerWidth,
      },
    },
  },
  drawerWidth: themeConfig.drawerWidth,
  borderRadius: themeConfig.borderRadius,
  paperPadding: themeConfig.paperPadding,
  headerHeight: themeConfig.headerHeight,
  shadows: themeConfig.shadows,
  containerWidthMd: 892,
  containerWidthMdWithDrawer: 660,
  containerWidthLg: 1100,
  containerWidthLgWithDrawer: 840,
  containerWidthXl: 1200,
  containerWidthXlWithDrawer: 1200,
  breakpoints: {
    values: themeConfig.breakpoints,
  },
  palette: {
    primary: {
      light: themeConfig.colorPrimaryLight, //red hues - 100
      main: themeConfig.colorPrimary,
      dark: themeConfig.colorPrimaryDark, //red hues - 500
    },
    secondary: {
      light: themeConfig.colorSecondaryLight,
      main: themeConfig.colorSecondary,
      dark: themeConfig.colorSecondaryDark,
      text: themeConfig.colorSecondaryText,
    },
    accent: {
      main: themeConfig.colorAccent,
    },
    neutral: {
      white: themeConfig.colorWhite,
      main: themeConfig.colorNeutralGrey,
      100: themeConfig.colorNeutralGrey100,
      200: themeConfig.colorNeutralGrey200,
      300: themeConfig.colorNeutralGrey300,
      400: themeConfig.colorNeutralGrey400,
      500: themeConfig.colorNeutralGrey500,
      600: themeConfig.colorNeutralGrey600,
      700: themeConfig.colorNeutralGrey700,
      800: themeConfig.colorNeutralGrey800,
      900: themeConfig.colorNeutralGrey900,
      1000: themeConfig.colorNeutralGrey1000,
      1100: themeConfig.colorNeutralGrey1100,
    },
    states: {
      state1: themeConfig.colorState1,
      state2: themeConfig.colorState2,
      state3: themeConfig.colorState3,
      state4: themeConfig.colorState4,
      state5: themeConfig.colorState5,
      state6: themeConfig.colorState6,
      state7: themeConfig.colorState7,
      state8: themeConfig.colorState8,
      state9: themeConfig.colorState9,
      state10: themeConfig.colorState10,
      state11: themeConfig.colorState11,
      state12: themeConfig.colorState12,
      state13: themeConfig.colorState13,
    },
  },
  typography: {
    allVariants: {
      color: themeConfig.textColor,
    },
    fontFamily: themeConfig.fontFamilyBase,
    htmlFontSize: themeConfig.fontSizeBase,
    fontWeightRegular: themeConfig.fontWeightRegular,
    fontWeightMedium: themeConfig.fontWeightMedium,
    fontWeightSemiBold: themeConfig.fontWeightSemiBold,
    h1: {
      fontSize: themeConfig.desktopHeadingsH1,
      fontWeight: themeConfig.fontWeightSemiBold,
      lineHeight: themeConfig.desktopHeadingsH1LineHeight,
      letterSpacing: themeConfig.desktopH1LetterSpacing,
      "&.MuiTypography-gutterBottom": {
        // use gutterBottom property on Typography component if you need a bottom margin
        marginBottom: themeConfig.desktopHeadingMarginXL,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopHeadingsParagraphLineHeight,
        fontWeight: themeConfig.fontWeightRegular,
        fontSize: themeConfig.paragraphH1FontSize,
      },
    },
    h2: {
      fontSize: themeConfig.desktopHeadingsH2,
      fontWeight: themeConfig.fontWeightSemiBold,
      lineHeight: themeConfig.desktopHeadingsH2LineHeight,
      "&.MuiTypography-gutterBottom": {
        // use gutterBottom property on Typography component if you need a bottom margin
        marginBottom: themeConfig.desktopHeadingMarginM,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopHeadingsParagraphLineHeight,
        fontWeight: themeConfig.fontWeightRegular,
        fontSize: themeConfig.paragraphH2FontSize,
      },
    },
    h3: {
      fontSize: themeConfig.desktopHeadingsH3,
      fontWeight: themeConfig.fontWeightSemiBold,
      lineHeight: themeConfig.desktopHeadingsH3LineHeight,
      "&.MuiTypography-gutterBottom": {
        // use gutterBottom property on Typography component if you need a bottom margin
        marginBottom: themeConfig.desktopHeadingMarginM,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopHeadingsParagraphLineHeight,
        fontWeight: themeConfig.fontWeightRegular,
      },
    },
    h4: {
      fontSize: themeConfig.desktopHeadingsH4,
      fontWeight: themeConfig.fontWeightSemiBold,
      lineHeight: themeConfig.desktopHeadingsH4LineHeight,
      "&.MuiTypography-gutterBottom": {
        // use gutterBottom property on Typography component if you need a bottom margin
        marginBottom: themeConfig.desktopHeadingMarginM,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopHeadingsParagraphLineHeight,
        fontWeight: themeConfig.fontWeightRegular,
      },
    },
    h5: {
      fontSize: themeConfig.desktopHeadingsH5,
      fontWeight: themeConfig.fontWeightSemiBold,
      lineHeight: themeConfig.desktopHeadingsLineHeight,
      "&.MuiTypography-gutterBottom": {
        // use gutterBottom property on Typography component if you need a bottom margin
        marginBottom: themeConfig.desktopHeadingMarginM,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopHeadingsParagraphLineHeight,
        fontWeight: themeConfig.fontWeightRegular,
      },
    },
    h6: {
      fontSize: themeConfig.desktopHeadingsH6,
      fontWeight: themeConfig.fontWeightSemiBold,
      lineHeight: themeConfig.desktopHeadingsLineHeight,
      letterSpacing: themeConfig.desktopH6LetterSpacing,
      textTransform: "uppercase",
      "&.MuiTypography-gutterBottom": {
        // use gutterBottom property on Typography component if you need a bottom margin
        marginBottom: themeConfig.desktopHeadingMarginS,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopHeadingsParagraphLineHeight,
        fontWeight: themeConfig.fontWeightRegular,
        textTransform: "none",
        fontSize: themeConfig.desktopHeadingsH4,
      },
    },
    //text
    body1: {
      fontSize: themeConfig.desktopTextFontSize,
      fontWeight: themeConfig.fontWeightRegular,
      lineHeight: themeConfig.desktopTextLineHeight,
      "&.MuiTypography-gutterBottom": {
        marginBottom: themeConfig.desktopTextMarginBottom,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopTextParagraphLineHeight,
      },
      "&.medium": {
        fontWeight: themeConfig.fontWeightSemiBold,
      },
      "&.strong": {
        fontWeight: themeConfig.fontWeightBold,
      },
      "&.huge": {
        fontSize: themeConfig.desktopDisplayHugeNumberFontSize,
        lineHeight: themeConfig.desktopDisplayHugeNumberLineHeight,
        letterSpacing: themeConfig.desktopDisplayHugeNumberLetterSpacing,
      },
      "&.tiny": {
        fontSize: themeConfig.desktopDisplayTinyLettersFontSize,
        fontWeight: themeConfig.desktopDisplayTinyLettersFontWeight,
        lineHeight: themeConfig.desktopDisplayTinyLettersLineHeight,
        letterSpacing: themeConfig.desktopDisplayTinyLettersLetterSpacing,
      },
    },
    //label
    body2: {
      fontSize: themeConfig.desktopLabelFontSize,
      fontWeight: themeConfig.fontWeightRegular,
      lineHeight: themeConfig.desktopLabelLineHeight,
      "&.MuiTypography-gutterBottom": {
        marginBottom: themeConfig.desktopLabelMarginBottom,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopTextParagraphLineHeight,
      },
      "&.medium": {
        fontWeight: themeConfig.fontWeightSemiBold,
      },
      "&.strong": {
        fontWeight: themeConfig.fontWeightBold,
      },
    },
    caption: {
      fontSize: themeConfig.desktopCaptionFontSize,
      fontWeight: themeConfig.fontWeightRegular,
      lineHeight: themeConfig.desktopCaptionLineHeight,
      "&.MuiTypography-gutterBottom": {
        marginBottom: themeConfig.desktopCaptionMarginBottom,
      },
      "&.paragraph": {
        lineHeight: themeConfig.desktopTextParagraphLineHeight,
      },
      "&.medium": {
        fontWeight: themeConfig.fontWeightSemiBold,
      },
      "&.strong": {
        fontWeight: themeConfig.fontWeightBold,
      },
    },
    borderRadius: themeConfig.borderRadius,
    button: {
      textTransform: "none",
      "&.Mui-disabled": {
        color: "#F8F7FA !important",
      },
      "&.primaryButton": {
        color: themeConfig.colorNeutralGrey100,
        boxShadow: themeConfig.shadows[2],
        backgroundColor: themeConfig.colorSecondary,
        border: `1px solid ${themeConfig.colorSecondary}`,
        "&:hover": {
          boxShadow: themeConfig.shadows[2],
          backgroundColor: themeConfig.colorSecondary,
        },
        "&.MuiButton-label": {
          color: themeConfig.colorNeutralGrey,
        },
      },
      "&.redButton": {
        color: themeConfig.colorNeutralGrey100,
        backgroundColor: themeConfig.colorPrimary,
        border: `1px solid ${themeConfig.colorPrimaryLight}`,
        boxShadow: themeConfig.shadows[2],
        "&:hover": {
          backgroundColor: themeConfig.colorPrimaryDark,
          boxShadow: themeConfig.shadows[2],
        },
        "&.MuiButton-label": {
          color: themeConfig.colorNeutralGrey100,
        },
      },
      "&.whiteButton": {
        color: themeConfig.colorSecondary,
        backgroundColor: themeConfig.colorWhite,
        border: `1px solid ${themeConfig.colorNeutralGrey300}`,
        boxShadow: themeConfig.shadows[2],
        "&:hover": {
          backgroundColor: themeConfig.colorWhite,
          boxShadow: themeConfig.shadows[2],
        },
        "&.MuiButton-label": {
          color: themeConfig.colorSecondary,
        },
      },
      "&.whiteOutlineButton": {
        color: themeConfig.colorNeutralGrey100,
        backgroundColor: "transparent",
        border: `1px solid ${themeConfig.colorNeutralGrey}`,
        boxShadow: "none",
        "&:hover": {
          backgroundColor: themeConfig.colorOutlineLightGrey,
          boxShadow: "none",
        },
        "&.MuiButton-label": {
          color: themeConfig.colorNeutralGrey,
        },
      },
      "&.linkButton": {
        color: themeConfig.colorAccent,
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "flex-start",
        height: 20,
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "transparent",
          textDecorationLine: "underline",
          boxShadow: "none",
        },
        "&.MuiButton-label": {
          justifyContent: "flex-start !important",
        },
      },
    },
  },
};

const useTheme = () => {
  const theme = useMemo(() => createTheme(defaultTheme), []);
  return theme;
};

export default useTheme;
