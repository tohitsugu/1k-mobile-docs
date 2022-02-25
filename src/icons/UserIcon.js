/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 14,
    height: 14,
    fill: "none",
    "& > path": {
      stroke: theme.palette.secondary.light,
      strokeWidth: 2,
      strokeMiterlimit: 10,
      strokeLinecap: "square",
    },
  },
}));

export const UserIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.583496 13.4167C0.583496 10.1949 3.19508 7.58334 6.41683 7.58334H7.5835C10.8052 7.58334 13.4168 10.1949 13.4168 13.4167" />
      <path d="M7 7.58334C8.933 7.58334 10.5 6.01633 10.5 4.08334C10.5 2.15034 8.933 0.583336 7 0.583336C5.067 0.583336 3.5 2.15034 3.5 4.08334C3.5 6.01633 5.067 7.58334 7 7.58334Z" />
    </svg>
  );
};
