/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 10,
    height: 5,
    fill: "none",
    "& > path": {
      fill: theme.palette.secondary.dark,
    },
  },
}));

export const ArrowDownIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0L5 5L10 0" />
    </svg>
  );
};
