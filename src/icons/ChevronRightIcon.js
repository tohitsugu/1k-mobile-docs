/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 8,
    height: 14,
    fill: "none",
    "& > path": {
      stroke: theme.palette.neutral[400],
      strokeWidth: 2,
      strokeMiterlimit: 10,
      strokeLinecap: "square",
    },
  },
}));

export const ChevronRightIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1.5 12L6.5 7L1.5 2" />
    </svg>
  );
};
