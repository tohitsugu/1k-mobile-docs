/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 24,
    height: 24,
    fill: "none",
    "& > path": {
      stroke: theme.palette.neutral[400],
      strokeWidth: 2,
      strokeMiterlimit: 10,
      strokeLinecap: "square",
    },
  },
}));

export const DashboardIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23Z" />
      <path d="M10.59 10.59L7 7" />
      <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" />
      <path d="M12 5V6" />
      <path d="M16.95 7.04999L16.243 7.75699" />
      <path d="M19 12H18" />
      <path d="M6 12H5" />
    </svg>
  );
};
