/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 9,
    height: 13,
    fill: "none",
    "& > path": {
      stroke: theme.palette.neutral[300],
      strokeWidth: 2,
      strokeMiterlimit: 10,
      strokeLinecap: "square",
    },
  },
}));

export const ChevronLeftIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 1.5L2 6.5L7 11.5" />
    </svg>
  );
};
