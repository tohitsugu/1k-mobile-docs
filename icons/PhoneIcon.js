/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 11,
    height: 17,
    fill: "none",
    "& > path": {
      fill: "#fff",
    },
  },
}));

export const PhoneIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 0.261963H2.18182C0.974545 0.261963 0 1.24424 0 2.4611V14.1898C0 15.4067 0.974545 16.3889 2.18182 16.3889H8C9.20727 16.3889 10.1818 15.4067 10.1818 14.1898V2.4611C10.1818 1.24424 9.20727 0.261963 8 0.261963ZM6.54545 14.9229H3.63636V14.1898H6.54545V14.9229ZM8.90909 12.7237H1.27273V2.4611H8.90909V12.7237Z" />
    </svg>
  );
};
