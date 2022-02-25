/* Core */
import { withStyles } from "@material-ui/core/styles";

const GlobalCss = withStyles((theme) => ({
  "@global": {
    "input, select": {
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      appearance: "none",
    },
    "input:-webkit-autofill,  textarea:-webkit-autofill, select:-webkit-autofill": {
      border: "none",
      backgroundColor: "#fff !important",
      backgroundImage: "none !important",
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.palette.neutral[200]} inset !important`,
      transition: "background-color 5000s ease-in-out 0s !important",
    },
    "input:-webkit-autofill:active, input:-webkit-autofill:hover,input:-webkit-autofill:focus,  textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill:hover, select:-webkit-autofill:focus": {
      border: "none",
      backgroundColor: "#fff !important",
      backgroundImage: "none !important",
      "-webkit-box-shadow": `0 0 0px 1000px ${theme.palette.neutral.white} inset !important`,
      transition: "background-color 5000s ease-in-out 0s !important",
    },
    "input::-ms-reveal, input::-ms-clear": {
      display: "none !important",
    },
    ".MuiContainer-root": {
      [theme.breakpoints.up("md")]: {
        maxWidth: theme.containerWidthMd,
        "&.withDrawer": {
          maxWidth: theme.containerWidthMdWithDrawer,
        },
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: theme.containerWidthLg,
        "&.withDrawer": {
          maxWidth: theme.containerWidthLgWithDrawer,
        },
      },
      [theme.breakpoints.up("xl")]: {
        maxWidth: theme.containerWidthXl,
        "&.withDrawer": {
          maxWidth: theme.containerWidthXlWithDrawer,
        },
      },
    },
    ".MuiAlert-action": {
      display: "block",
    },
    ".MuiPaper-root": {
      borderRadius: theme.paperBorderRadius,
      padding: theme.paperPadding,
    },
    ".MuiDataGrid-root": {
      "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-cell:focus": {
        outline: "none",
      },
      border: "none",
      "& .MuiDataGrid-columnSeparator": {
        display: "none",
      },
      "& .MuiDataGrid-columnsContainer": {
        boxShadow: theme.shadows[4],
        borderBottom: "none",
      },
      "& .MuiDataGrid-row": {
        "&:hover": {
          backgroundColor: theme.palette.neutral[100],
        },
        "&.Mui-selected,&.Mui-selected:hover": {
          backgroundColor: theme.palette.neutral[100],
        },
      },
      "& .MuiDataGrid-cell": {
        boxShadow: theme.shadows[4],
        borderBottom: "none",
        display: "flex",
        alignItems: "center",
        "& .MuiSvgIcon-root": {
          fontSize: "1.34rem",
        },
      },
      "& .MuiDataGrid-columnHeaderTitleContainer": {
        padding: 0,
      },
      "& .MuiDataGrid-colCellTitle": {
        fontWeight: theme.typography.fontWeightSemiBold,
        color: theme.palette.secondary.text,
      },
      "& .MuiDataGrid-colCellTitleContainer": {
        "& .MuiSvgIcon-root": {
          fontSize: "1.34rem",
        },
      },
      "& .MuiDataGrid-cellCheckbox, .MuiCheckbox-colorPrimary.Mui-checked ": {
        color: theme.palette.accent.main,
        "&:hover": {
          backgroundColor: theme.palette.neutral[100],
        },
      },
      "& .MuiCheckbox-root": {
        color: theme.palette.neutral[400],
        "&:hover": {
          backgroundColor: theme.palette.neutral[100],
        },
      },
      "& .MuiToolbar-root": {
        boxShadow: theme.shadows[4],
      },
      "& .MuiTablePagination-root": {
        border: "none",
      },
      "& .MuiTablePagination-toolbar": {
        boxShadow: theme.shadows[0],
      },
      "& .MuiPagination-ul": {
        "& .MuiPaginationItem-root": {
          padding: 0,
          minWidth: 20,
          color: theme.palette.neutral[400],
          fontSize: "1rem",
        },
        "& .MuiPaginationItem-page.Mui-selected": {
          backgroundColor: "transparent",
          fontWeight: theme.typography.fontWeightSemiBold,
        },
        "& > li:first-child > button": {
          minWidth: 36,
          boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.05)",
          borderRadius: "4px 0px 0px 4px",
          border: "1px solid #BBBFC3",
        },
        "& > li:last-child > button": {
          boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.05)",
          borderRadius: "0px 4px 4px 0px",
          border: "1px solid #BBBFC3",
          minWidth: 36,
        },
      },
    },
    ".MuiPopover-paper": {
      borderRadius: 4,
      "& .MuiListItemIcon-root": {
        minWidth: 26,
      },
    },
    ".MuiTooltip-popper": {
      "& .MuiTooltip-tooltipArrow": {
        padding: "8px 10px",
        left: "-6px",
        fontSize: "0.875rem",
        backgroundColor: theme.palette.secondary.text,
      },
      "& .MuiTooltip-arrow": {
        color: theme.palette.secondary.text,
      },
    },
    ".MuiDrawer-paperAnchorDockedLeft": {
      borderRight: `1px solid ${theme.palette.neutral[200]}`,
    },
    //Input field style starts here
    ".MuiFormHelperText-root": {
      marginLeft: 0,
      display: "flex",
      alignItems: "flex-end",
      marginTop: 4,
      fontSize: "0.875rem",
      color: theme.palette.secondary.text,
      "&.Mui-error": {
        color: theme.palette.primary.main,
      },
      "& svg": {
        marginRight: 10,
      },
    },
    ".MuiInputBase-root": {
      "& .MuiInputBase-input": {
        minHeight: 18,
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.neutral[200],
        fontSize: "0.875rem",
        padding: "8px 26px 8px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        boxShadow: "0px 1px 0px rgba(0, 0, 0, 0.05)",
        color: theme.palette.secondary.light,
        border: `1px solid ${theme.palette.neutral[200]}`,
        "&.Mui-disabled, &.Mui-disabled:hover, &.Mui-disabled:focus": {
          color: theme.palette.secondary.text,
          backgroundColor: theme.palette.neutral[200],
          border: `1px solid ${theme.palette.neutral[200]}`,
        },
        "&:hover, &:focus": {
          backgroundColor: `${theme.palette.neutral.white}`,
          border: `1px solid ${theme.palette.neutral[300]}`,
        },
      },
      "&.Mui-error .MuiInputBase-input": {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.primary.light,
      },
      "&.Mui-disabled": {
        color: theme.palette.neutral[300],
        "& svg": {
          fill: `${theme.palette.neutral[300]}`,
        },
        "& path": {
          fill: `${theme.palette.neutral[300]}`,
        },
      },
      "&.MuiInputBase-multiline": {
        padding: 0,
      },
      "& ::-webkit-input-placeholder": {
        /* Chrome/Opera/Safari */ color: theme.palette.neutral[300],
        fontSize: "0.875rem",
      },
      "& ::-moz-placeholder": {
        /* Firefox 19+ */ color: theme.palette.neutral[300],
        fontSize: "0.875rem",
      },
      "& :-ms-input-placeholder": {
        /* IE 10+ */ color: theme.palette.neutral[300],
        fontSize: "0.875rem",
      },
      "& :-moz-placeholder": {
        /* Firefox 18- */ color: theme.palette.neutral[300],
        fontSize: "0.875rem",
      },
    },
  },
}))(() => null);

export default GlobalCss;