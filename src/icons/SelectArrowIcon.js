/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 20,
    height: 20,
    fill: "none",
    "& > path": {
      fillRule: "evenodd",
      clipRule: "evenodd",
      fill: theme.palette.neutral[500],
    },
  },
}));

export const SelectArrowIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 16L6 12H14L10 16ZM10 4L14 8H6L10 4Z" />
    </svg>
  );
};
