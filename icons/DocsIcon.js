/* Core */
import React from "react";
import cx from "classnames";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 32,
    height: 32,
    fill: "none",
  },
}));

export const DocsIcon = ({ className = "" }) => {
  const classes = useStyles();
  return (
    <svg
      className={cx(classes.icon, className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="4" fill="#F2F3FD" />
      <g clipPath="url(#clip0_3122_595)">
        <path
          d="M19.3333 11H12.6666V15.1667H19.3333V11Z"
          stroke="#416EE6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M23.5 21V6.83337H10.1667C9.24583 6.83337 8.5 7.57921 8.5 8.50004V23.0834"
          stroke="#416EE6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5833 21H23.5V25.1667H10.5833C9.4325 25.1667 8.5 24.2342 8.5 23.0833C8.5 21.9325 9.4325 21 10.5833 21Z"
          stroke="#416EE6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3122_595">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(6 6)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
