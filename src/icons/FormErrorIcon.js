/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 16,
    height: 16,
    fill: "none",
    "& > path": {
      fill: theme.palette.primary.main,
      fillRule: "evenodd",
      clipRule: "evenodd",
    },
  },
}));

export const FormErrorIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16ZM7 6.9996C7 7.55188 7.44772 7.9996 8 7.9996C8.55229 7.9996 9 7.55188 9 6.9996V4.9996C9 4.44732 8.55229 3.9996 8 3.9996C7.44772 3.9996 7 4.44732 7 4.9996V6.9996ZM7 10.9996C7 11.5519 7.44772 11.9996 8 11.9996C8.55229 11.9996 9 11.5519 9 10.9996C9 10.4473 8.55229 9.9996 8 9.9996C7.44772 9.9996 7 10.4473 7 10.9996Z" />
    </svg>
  );
};
