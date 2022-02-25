/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 37,
    height: 37,
    fill: "none",
  },
}));

export const CopyIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.66667 0.666687H1.66667C0.933334 0.666687 0.333334 1.26669 0.333334 2.00002V11.3334H1.66667V2.00002H9.66667V0.666687ZM11.6667 3.33335H4.33333C3.6 3.33335 3 3.93335 3 4.66669V14C3 14.7334 3.6 15.3334 4.33333 15.3334H11.6667C12.4 15.3334 13 14.7334 13 14V4.66669C13 3.93335 12.4 3.33335 11.6667 3.33335ZM11.6667 14H4.33333V4.66669H11.6667V14Z"
        fill="#416EE6"
      />
    </svg>
  );
};
